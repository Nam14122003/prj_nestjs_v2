export declare class RegisterUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export declare class CodeAuthDto {
    id: string;
    codeId: string;
    codeExpired: Date;
}
export declare class UpdateCodeAuthDto {
    id: string;
    codeId: string;
    codeExpired: Date;
}
export declare class UpdatePasswordAuthDto {
    id: string;
    password: string;
    codeId: string;
    codeExpired: Date;
    cofirmPassword: string;
}
