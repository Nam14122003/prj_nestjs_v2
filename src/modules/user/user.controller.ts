import { BadRequestException, Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from '@/modules/user/user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';
import { FillterUserDto } from '@/modules/user/dto/fillter-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { Roles } from '@/modules/auth/decorator/role.decorator';
import { LocalAuthGuard } from '@/modules/auth/jwt/local-auth.guard';
import {storage, storage1} from "@/cloudinary/cloudinary.multer";

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseGuards(LocalAuthGuard)
export class UserController {
    constructor(private userService: UserService){}

    @Roles('Admin')
    // @ApiQuery({name:'page'})
    // @ApiQuery({name:'itemsPerPage'})
    // @ApiQuery({name:'search'})
    @Get()
    findAll(@Query() query: FillterUserDto):Promise<User[]> {
        return this.userService.findAll(query);
    }

    @Get('profile')
    profile(@Req() req: any): Promise<User> {
        return this.userService.findOne(Number(req.user_data.id))
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(Number(id));
    }

    // @SetMetadata('roles', ['Admin'])
    @Roles('Admin')
    @Post('register')
    create(@Body() dto: CreateUserDto): Promise<User> {       
        return this.userService.create(dto);
    }

    @Roles('Admin')
    @Patch(':id')
    update(@Param('id') id:string, @Body() dto: UpdateUserDto) {
        return this.userService.update(Number(id), dto);
    }

    @Roles('Admin')
    @Delete('multiple')
    multipleDelete(@Query('ids', new ParseArrayPipe({items: String, separator: ','})) ids: string[]) {
        console.log("delete multi=> ",ids);
        return this.userService.mutipleDelete(ids)
    }

    @Roles('Admin')
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(Number(id));
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        }
      }
    },
    })
    @Post('upload-avatar')
    @UseInterceptors(FileInterceptor('avatar', {storage: storage1}))
    uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
        if(req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if(!file) {
            throw new BadRequestException('File is required!')
        }
        this.userService.updateAvatar(req.user_data.id, file.path);
    }
}
