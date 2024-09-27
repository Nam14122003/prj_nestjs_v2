import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class RegisterUserDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}

export class CodeAuthDto {
    @ApiProperty()
    @IsNotEmpty({message: 'Id không được để trống'})
    id: string;
    @ApiProperty()
    @IsNotEmpty({message: 'Mã code không được để trống'})
    codeId:string;    

    @CreateDateColumn()
    codeExpired: Date;
}

export class UpdateCodeAuthDto {
    @ApiProperty()
    @IsNotEmpty({message: 'Id không được để trống'})
    id: string;

    codeId:string;   
    
    codeExpired: Date;
    
}

export class UpdatePasswordAuthDto {
    @ApiProperty()
    @IsNotEmpty({message: 'id không được để trống'})
    id: string;

    password: string; 

    codeId:string;    

    codeExpired: Date;

    cofirmPassword: string; 
}