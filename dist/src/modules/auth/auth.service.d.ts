import { User } from '@/modules/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CodeAuthDto, RegisterUserDto, UpdateCodeAuthDto, UpdatePasswordAuthDto } from '@/modules/auth/dto/register-user.dto';
import { LoginUserDto } from '@/modules/auth/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class AuthService {
    private userRepository;
    private jwtService;
    private configService;
    private mailerService;
    private eventEmitter;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService, mailerService: MailerService, eventEmitter: EventEmitter2);
    private readonly logger;
    register(dto: RegisterUserDto): Promise<User>;
    validateUser(email: string, password: string): Promise<any>;
    login(dto: LoginUserDto): Promise<any>;
    refreshToken(refresh_token: string): Promise<any>;
    private generateToken;
    private hashPassword;
    checkCode(dto: CodeAuthDto): Promise<any>;
    verifyActive(dto: UpdateCodeAuthDto): Promise<any>;
    retryPassword(dto: UpdatePasswordAuthDto): Promise<any>;
    changePassword(dto: UpdatePasswordAuthDto): Promise<any>;
    checkUser(payload: {
        id: number;
        email: string;
    }): Promise<any>;
    handleCron(): Promise<void>;
}
