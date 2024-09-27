"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
const otplib_1 = require("otplib");
const moment_1 = __importDefault(require("moment"));
const mailer_1 = require("@nestjs-modules/mailer");
let AuthService = exports.AuthService = class AuthService {
    constructor(userRepository, jwtService, configService, mailerService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailerService = mailerService;
    }
    async register(dto) {
        const hashPassword = await this.hashPassword(dto.password);
        const codeId = (0, uuid_1.v4)();
        otplib_1.authenticator.options = { digits: 6, step: 120 };
        const secret = otplib_1.totp.generate(codeId);
        const codeExpired = (0, moment_1.default)().add(otplib_1.authenticator.options.step, 'second') + '';
        this.mailerService
            .sendMail({
            to: dto.email,
            subject: 'Activate Your Account at @ngocnam',
            template: 'register',
            context: {
                name: dto.lastName,
                activationCode: secret
            }
        });
        return await this.userRepository.save({
            ...dto,
            refresh_token: "refresh_token_string",
            password: hashPassword,
            codeId: secret,
            codeExpired: codeExpired,
            status: 2
        });
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findOneBy({ email });
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(dto) {
        const user = await this.userRepository.findOne({
            where: { email: dto.email }
        });
        if (!user) {
            throw new common_1.HttpException("Email is not exist", common_1.HttpStatus.UNAUTHORIZED);
        }
        const checkPass = bcrypt.compareSync(dto.password, user.password);
        if (!checkPass) {
            throw new common_1.HttpException('Password is not correct', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (user.status == 2) {
            throw new common_1.BadRequestException("Tài khoản chưa được kích hoạt!");
        }
        const payload = { id: user.id, email: user.email };
        return this.generateToken(payload);
    }
    async refreshToken(refresh_token) {
        try {
            const verify = await this.jwtService.verifyAsync(refresh_token, {
                secret: this.configService.get('SECRET')
            });
            const checkExistToken = await this.userRepository.findOneBy({ email: verify.email, refresh_token });
            if (checkExistToken) {
                return this.generateToken({ id: verify.id, email: verify.email });
            }
            else {
                throw new common_1.HttpException('Refresh is not vali', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException('Refresh token is not vaild', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async generateToken(payload) {
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('SECRET'),
            expiresIn: this.configService.get('EXP_IN_REFRESH_TOKEN')
        });
        await this.userRepository.update({ email: payload.email }, { refresh_token: refresh_token });
        return { access_token, refresh_token };
    }
    async hashPassword(password) {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }
    async checkCode(dto) {
        const user = await this.userRepository.findOneBy({ id: +(dto.id), codeId: dto.codeId });
        if (!user) {
            throw new common_1.BadRequestException("Tài khoản không tồn tại!");
        }
        const isBeforeCheck = (0, moment_1.default)().isBefore(dto.codeExpired);
        if (isBeforeCheck) {
            await this.userRepository.update({ id: +(dto.id) }, {
                status: 1
            });
        }
        else {
            throw new common_1.BadRequestException("Mã code không hợp lệ hoặc hết hạn!");
        }
        return dto;
    }
    async verifyActive(dto) {
        const user = await this.userRepository.findOneBy({ id: +(dto.id) });
        if (!user) {
            throw new common_1.BadRequestException("Tài khoản không tồn tại!");
        }
        if (user.status == 1) {
            throw new common_1.BadRequestException("Tài khoản đã được kích hoạt!");
        }
        const codeId = (0, uuid_1.v4)();
        otplib_1.authenticator.options = { digits: 6, step: 120 };
        const secret = otplib_1.totp.generate(codeId);
        const codeExpired = (0, moment_1.default)().add(otplib_1.authenticator.options.step, 'minutes') + '';
        await this.userRepository.update({ id: +(dto.id) }, {
            codeId: secret,
            codeExpired: codeExpired
        });
        this.mailerService
            .sendMail({
            to: user.email,
            subject: 'Activate Your Account at @ngocnam',
            template: 'register',
            context: {
                name: user.lastName,
                activationCode: secret
            }
        });
        return { secret, codeExpired };
    }
    async retryPassword(dto) {
        const user = await this.userRepository.findOneBy({ id: +(dto.id) });
        if (!user) {
            throw new common_1.BadRequestException("Tài khoản không tồn tại!");
        }
        const codeId = (0, uuid_1.v4)();
        otplib_1.authenticator.options = { digits: 6, step: 120 };
        const secret = otplib_1.totp.generate(codeId);
        const codeExpired = (0, moment_1.default)().add(otplib_1.authenticator.options.step, 'minutes') + '';
        await this.userRepository.update({ id: +(dto.id) }, {
            codeId: secret,
            codeExpired: codeExpired
        });
        this.mailerService
            .sendMail({
            to: user.email,
            subject: 'Change Your Pass Account at @ngocnam',
            template: 'register',
            context: {
                name: user.lastName,
                activationCode: secret
            }
        });
        return { secret, codeExpired };
    }
    async changePassword(dto) {
        if (dto.cofirmPassword !== dto.password) {
            throw new common_1.BadRequestException("Mật khẩu / Xác nhận mật khẩu không trùng khớp!S");
        }
        const user = await this.userRepository.findOneBy({ id: +(dto.id) });
        if (!user) {
            throw new common_1.BadRequestException("Tài khoản không tồn tại!");
        }
        const codeId = (0, uuid_1.v4)();
        otplib_1.authenticator.options = { digits: 6, step: 120 };
        const secret = otplib_1.totp.generate(codeId);
        const codeExpired = (0, moment_1.default)().add(otplib_1.authenticator.options.step, 'minutes') + '';
        await this.userRepository.update({ id: +(dto.id) }, {
            codeId: secret,
            codeExpired: codeExpired
        });
        const isBeforeCheck = (0, moment_1.default)().isBefore(dto.codeExpired);
        if (isBeforeCheck) {
            const newPassword = await this.hashPassword(dto.password);
            await this.userRepository.update({ id: +(dto.id) }, {
                password: newPassword
            });
        }
        return dto.password;
    }
    async checkUser(payload) {
        const user = await this.userRepository.findOneBy({ id: payload.id });
        if (!user) {
            throw new common_1.BadRequestException("User không tồn tại ");
        }
        return user;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map