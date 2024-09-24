import {  BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CodeAuthDto, RegisterUserDto, UpdateCodeAuthDto, UpdatePasswordAuthDto } from '@/auth/dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '@/auth/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { authenticator, totp, hotp } from 'otplib';
import moment from 'moment';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, 
    private jwtService: JwtService, 
    private configService: ConfigService,
    private mailerService: MailerService) {}
    async register(dto : RegisterUserDto): Promise<User> {
        const hashPassword = await this.hashPassword(dto.password);
        const codeId = uuidv4();
        authenticator.options = { digits: 6, step: 120};
        const secret = totp.generate(codeId);
        const codeExpired = moment().add(authenticator.options.step, 'second') + '';
        this.mailerService
        .sendMail({
            to: dto.email, // list of receivers
            subject: 'Activate Your Account at @ngocnam', // Subject line
            template: 'register',
            context: {
                name: dto.lastName,
                activationCode: secret
            }
        })
        return await this.userRepository.save(
            {
                ...dto, 
                refresh_token: "refresh_token_string", 
                password: hashPassword, 
                codeId: secret, 
                codeExpired: codeExpired ,
                status: 2
            })
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOneBy({email});
        if (user && user.password === password) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    

    async login(dto: LoginUserDto): Promise<any> {
        const user = await this.userRepository.findOne(
            {
                where: {email: dto.email}
            }
        )
        if(!user) {
            throw new HttpException("Email is not exist", HttpStatus.UNAUTHORIZED);
        }
        const checkPass = bcrypt.compareSync(dto.password, user.password);
        if(!checkPass) {
            throw new HttpException('Password is not correct', HttpStatus.UNAUTHORIZED);
        }
        if (user.status == 2) {
            throw new BadRequestException("Tài khoản chưa được kích hoạt!")
        }
        //Generate access token and refresh token 
        const payload = {id:user.id, email:user.email};
        return this.generateToken(payload);
    }

    async refreshToken(refresh_token: string): Promise<any> {
        try {
            const verify = await this.jwtService.verifyAsync(refresh_token, {
                secret: this.configService.get<string>('SECRET')
            })
            const checkExistToken = await this.userRepository.findOneBy({email: verify.email, refresh_token})
            if(checkExistToken) {
                return this.generateToken({id: verify.id, email: verify.email})
            }
            else {
                throw new HttpException('Refresh is not vali', HttpStatus.BAD_REQUEST);
            }
        }
        catch(error) {
            throw new HttpException('Refresh token is not vaild', HttpStatus.BAD_REQUEST)   
        }
    }

    private async generateToken(payload:{id: number, email: string}) {
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('SECRET'),
            expiresIn: this.configService.get<string>('EXP_IN_REFRESH_TOKEN')
        })
        await this.userRepository.update(
            {email: payload.email},
            {refresh_token: refresh_token}
        )

        return {access_token, refresh_token};
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(password, salt);
        return hash ;
    }
    
    async checkCode(dto: CodeAuthDto): Promise<any>{
        const user = await this.userRepository.findOneBy({ id: +(dto.id), codeId: dto.codeId})
        if (!user) {
            throw new BadRequestException("Tài khoản không tồn tại!");
        }

        const isBeforeCheck = moment().isBefore(dto.codeExpired);
        if(isBeforeCheck) {
            await this.userRepository.update({id: +(dto.id)}, {
                status: 1
            })
        }
        else {
            throw new BadRequestException("Mã code không hợp lệ hoặc hết hạn!")
        }
        return dto;
    }

    async verifyActive(dto: UpdateCodeAuthDto): Promise<any>{
        const user = await this.userRepository.findOneBy({ id: +(dto.id) })
        if (!user) {
            throw new BadRequestException("Tài khoản không tồn tại!");
        }
        if (user.status == 1) {
            throw new BadRequestException("Tài khoản đã được kích hoạt!");
        }
        const codeId = uuidv4();
        authenticator.options = { digits: 6, step: 120};
        const secret = totp.generate(codeId);
        const codeExpired = moment().add(authenticator.options.step, 'minutes') + '';
        await this.userRepository.update({id: +(dto.id)}, {
            codeId: secret,
            codeExpired: codeExpired
        })
        this.mailerService
        .sendMail({
            to: user.email, // list of receivers
            subject: 'Activate Your Account at @ngocnam', // Subject line
            template: 'register',
            context: {
                name: user.lastName,
                activationCode: secret
            }
        })
        return {secret, codeExpired};
    }

    async retryPassword(dto: UpdatePasswordAuthDto): Promise<any>{
        const user = await this.userRepository.findOneBy({ id: +(dto.id) })
        if (!user) {
            throw new BadRequestException("Tài khoản không tồn tại!");
        }
        const codeId = uuidv4();
        authenticator.options = { digits: 6, step: 120};
        const secret = totp.generate(codeId);
        const codeExpired = moment().add(authenticator.options.step, 'minutes') + '';
        await this.userRepository.update({id: +(dto.id)}, {
            codeId: secret,
            codeExpired: codeExpired
        })
        this.mailerService
        .sendMail({
            to: user.email, // list of receivers
            subject: 'Change Your Pass Account at @ngocnam', // Subject line
            template: 'register',
            context: {
                name: user.lastName,
                activationCode: secret
            }
        })
        return {secret, codeExpired};
    }

    async changePassword(dto: UpdatePasswordAuthDto): Promise<any>{
        if (dto.cofirmPassword !== dto.password) {
            throw new BadRequestException("Mật khẩu / Xác nhận mật khẩu không trùng khớp!S")
        }
        const user = await this.userRepository.findOneBy({ id: +(dto.id) })
        if (!user) {
            throw new BadRequestException("Tài khoản không tồn tại!");
        }
        const codeId = uuidv4();
        authenticator.options = { digits: 6, step: 120};
        const secret = totp.generate(codeId);
        const codeExpired = moment().add(authenticator.options.step, 'minutes') + '';
        await this.userRepository.update({id: +(dto.id)}, {
            codeId: secret,
            codeExpired: codeExpired
        })
        const isBeforeCheck = moment().isBefore(dto.codeExpired);
        if(isBeforeCheck) {
            const newPassword =  await this.hashPassword(dto.password);
            await this.userRepository.update({id: +(dto.id)}, {
                password: newPassword
            })
        }
        return dto.password;
    }
}
