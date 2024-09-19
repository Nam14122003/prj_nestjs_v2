import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { User } from "@/user/entities/user.entity";
import { Repository } from "typeorm";
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private configService;
    private userRepository;
    private reflector;
    constructor(jwtService: JwtService, configService: ConfigService, userRepository: Repository<User>, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFormHeader;
}
