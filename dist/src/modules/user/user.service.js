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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
let UserService = exports.UserService = class UserService {
    constructor(userRespository) {
        this.userRespository = userRespository;
    }
    async findAll(query) {
        const itemsPerPage = Number(query.itemsPerPage) || 10;
        const keyword = query.search || '';
        const page = Number(query.page) || 1;
        const skip = (page - 1) * itemsPerPage;
        const [res, total] = await this.userRespository.findAndCount({
            where: [
                { firstName: (0, typeorm_2.Like)('%' + keyword + '%') },
                { lastName: (0, typeorm_2.Like)('%' + keyword + '%') },
                { email: (0, typeorm_2.Like)('%' + keyword + '%') },
            ],
            order: { createdAt: "DESC" },
            take: itemsPerPage,
            skip: skip,
            select: ['id', 'firstName', 'lastName', 'email', 'status', 'createdAt', 'updatedAt']
        });
        const lastPage = Math.ceil(total / itemsPerPage);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;
        return {
            data: res,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }
    async findOne(id) {
        return await this.userRespository.findOneBy({ id });
    }
    async create(dto) {
        const hashPassword = await bcrypt.hash(dto.password, 10);
        return await this.userRespository.save(dto);
    }
    async update(id, dto) {
        return await this.userRespository.update(id, dto);
    }
    async delete(id) {
        return await this.userRespository.delete(id);
    }
    async updateAvatar(id, avatar) {
        return await this.userRespository.update(id, { avatar });
    }
    async mutipleDelete(ids) {
        return await this.userRespository.delete({ id: (0, typeorm_2.In)(ids) });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map