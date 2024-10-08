import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { CreatePostDto } from '@/modules/post/dto/create-post.dto';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import { AuthGuard } from '@/modules/auth/jwt/auth.guard';
import { PostService } from '@/modules/post/post.service';
import { FilterPostDto } from '@/modules/post/dto/filter-post.dto';
import { Post as PostEntity} from "@/modules/post/entities/post.entity"
import { UpdatePostDto } from '@/modules/post/dto/update-post.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {CloudinaryService} from "@/cloudinary/cloudinary.service";
import {storage} from '@/cloudinary/cloudinary.multer';
import {UploadImagesDto} from "@/modules/post/dto/upload-images.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import { Post as Post1 } from '@/modules/post/entities/post.entity';

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('posts')
export class PostController {
    constructor(
        @InjectRepository(Post1) private postRepository: Repository<Post1>,
        private postService: PostService,
        private readonly cloudinaryService: CloudinaryService
    ){}
    @UseGuards(AuthGuard)
    @UsePipes(ValidationPipe)
    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {type: 'string'},
        description: {type: 'string'},
        file: {
          type: 'string',
          format: 'binary',
        },
        status: {type: 'number'}
      }
    },
    })
    @UseInterceptors(FileInterceptor('image', {storage}))
    create(@Req() req: any, @Body() createPostDto: CreatePostDto, @UploadedFile() file: Express.Multer.File) {
        if(req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if(!file) {
            throw new BadRequestException('File is required!')
        }
        return this.postService.create(req['user_data'].id, {...createPostDto, thumbnail: file.path})
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(@Query() query: FilterPostDto): Promise<any> {
        return this.postService.findAll(query);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    findDetail(@Param('id') id: string):Promise<PostEntity> {
        return this.postService.findDetail(Number(id));
    }

    @UseGuards(AuthGuard)
    
    @Patch(':id')
    // @UseInterceptors(FileInterceptor('thumbnail', {
    //     storage:storageConfig('post'),
    //     fileFilter:(req, file, cb) => {
    //         const ext = extname(file.originalname);
    //         const allowedExtArr = ['.jpg', '.png', '.jpeg'];
    //         if(!allowedExtArr.includes(ext)) {
    //             req.fileValidationError = `Wrong extension type. Acept file ext are: ${allowedExtArr.toString()}`;
    //             cb(null, false);
    //         }
    //         else {
    //             const fileSize = parseInt(req.headers['content-length']);
    //             if(fileSize > 1024 * 1024 * 5) {
    //                 req.fileValidationError = 'File size is too large. Acept fize size is lass than 5 MB';;
    //                 cb(null, false);
    //             }
    //             else {
    //                 cb(null, true);
    //             }
    //         }
    //     }
    // }))
    @UseInterceptors(FileInterceptor('image', {storage}))
    update(@Param('id') id: string, @Req() req: any, @Body() dto: UpdatePostDto, @UploadedFile() file: Express.Multer.File) {
        if(req.fileValidationError) {
            throw new BadRequestException(req.fileValidationError);
        }
        if(file) {
            dto.thumbnail = file.path;
        }

        return this.postService.update(Number(id), dto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.postService.delete(Number(id));
    }


    // Upload image in description
    @Post('cke-upload')
    // @UseInterceptors(FileInterceptor('upload', {
    //     storage:storageConfig('ckeditor'),
    //     fileFilter:(req, file, cb) => {
    //         const ext = extname(file.originalname);
    //         const allowedExtArr = ['.jpg', '.png', '.jpeg'];
    //         if(!allowedExtArr.includes(ext)) {
    //             req.fileValidationError = `Wrong extension type. Acept file ext are: ${allowedExtArr.toString()}`;
    //             cb(null, false);
    //         }
    //         else {
    //             const fileSize = parseInt(req.headers['content-length']);
    //             if(fileSize > 1024 * 1024 * 5) {
    //                 req.fileValidationError = 'File size is too large. Acept fize size is lass than 5 MB';;
    //                 cb(null, false);
    //             }
    //             else {
    //                 cb(null, true);
    //             }
    //         }
    //     }
    // }))
    @UseInterceptors(FileInterceptor('image', {storage}))
    ckeUpload(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
        return {
            'url': file.path
        }
    }

    @Post('images')
    @UseInterceptors(FilesInterceptor('images'))
    async uploadMultiImage(id: number, dto: UploadImagesDto, @UploadedFiles() images: Express.Multer.File[]) {
        const post = await this.postRepository.findOneBy({id}); // Lấy bài post từ DB
        let kq = "";
        for (let image of images) {
            const url = await this.cloudinaryService.uploadImage(image);
            kq += url.url.toString() + ',';
        }
        let kq1 = kq.substring(0, kq.length - 1);
        post.thumbnail = kq1; // Gán chuỗi URL cho trường thumbnail
        await this.postRepository.save(post); // Lưu lại vào DB
    }
}
