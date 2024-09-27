import { CodeAuthDto, RegisterUserDto, UpdateCodeAuthDto, UpdatePasswordAuthDto } from '@/modules/auth/dto/register-user.dto';
import { AuthService } from '@/modules/auth/auth.service';
import { LoginUserDto } from '@/modules/auth/dto/login-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthController {
    private authService;
    private readonly mailerService;
    constructor(authService: AuthService, mailerService: MailerService);
    register(dto: RegisterUserDto): Promise<import("../user/entities/user.entity").User>;
    login(dto: LoginUserDto): Promise<any>;
    refreshToken({ refresh_token }: {
        refresh_token: any;
    }): Promise<any>;
    checkCode(dto: CodeAuthDto): Promise<any>;
    verifyActive(dto: UpdateCodeAuthDto): Promise<any>;
    retryPassword(dto: UpdatePasswordAuthDto): Promise<any>;
    changePassword(dto: UpdatePasswordAuthDto): Promise<any>;
}
