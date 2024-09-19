import { Body, Controller, Post, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { CodeAuthDto, RegisterUserDto, UpdateCodeAuthDto, UpdatePasswordAuthDto } from '@/auth/dto/register-user.dto';
import { AuthService } from '@/auth/auth.service';
import { LoginUserDto } from '@/auth/dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@/auth/decorator/public.decorator';
import { MailerService } from '@nestjs-modules/mailer';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly mailerService: MailerService){}
    @Post('register')
    @Public()
    register(@Body() dto: RegisterUserDto) {  
        return this.authService.register(dto);
    }

    @Public()
    @Post('login')
    @SetMetadata('isPublic', true)
    @ApiResponse({status:201, description:'Login successfully!!'})
    @ApiResponse({status:401, description:'Login faild!!'})
    @UsePipes(ValidationPipe)
    login(@Body() dto: LoginUserDto):Promise<any> {
        return this.authService.login(dto);
    }

    @Public()
    @Post('refresh-token')
    @SetMetadata('isPublic', true)
    refreshToken(@Body() {refresh_token}):Promise<any> {
        console.log('refresh token api');
        return this.authService.refreshToken(refresh_token)
    }
    
    @Post('check-code')
    @Public()
    checkCode(@Body() dto: CodeAuthDto): Promise<any> { 
        return this.authService.checkCode(dto);
    }

    @Post('verify-active')
    @Public()
    verifyActive(@Body() dto: UpdateCodeAuthDto): Promise<any> { 
        return this.authService.verifyActive(dto);
    }

    
    @Post('retry-password')
    @Public()
    retryPassword(@Body() dto: UpdatePasswordAuthDto): Promise<any> { 
        return this.authService.retryPassword(dto);
    }

    @Post('change-password')
    @Public()
    changePassword(@Body() dto: UpdatePasswordAuthDto): Promise<any> { 
        return this.authService.changePassword(dto);
    }
}



