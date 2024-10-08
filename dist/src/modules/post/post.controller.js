"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const create_post_dto_1 = require("./dto/create-post.dto");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../auth/jwt/auth.guard");
const post_service_1 = require("./post.service");
const filter_post_dto_1 = require("./dto/filter-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const swagger_1 = require("@nestjs/swagger");
const cloudinary_service_1 = require("../../cloudinary/cloudinary.service");
const cloudinary_multer_1 = require("../../cloudinary/cloudinary.multer");
const upload_images_dto_1 = require("./dto/upload-images.dto");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./entities/post.entity");
let PostController = exports.PostController = class PostController {
    constructor(postRepository, postService, cloudinaryService) {
        this.postRepository = postRepository;
        this.postService = postService;
        this.cloudinaryService = cloudinaryService;
    }
    create(req, createPostDto, file) {
        if (req.fileValidationError) {
            throw new common_1.BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new common_1.BadRequestException('File is required!');
        }
        return this.postService.create(req['user_data'].id, { ...createPostDto, thumbnail: file.path });
    }
    findAll(query) {
        return this.postService.findAll(query);
    }
    findDetail(id) {
        return this.postService.findDetail(Number(id));
    }
    update(id, req, dto, file) {
        if (req.fileValidationError) {
            throw new common_1.BadRequestException(req.fileValidationError);
        }
        if (file) {
            dto.thumbnail = file.path;
        }
        return this.postService.update(Number(id), dto);
    }
    delete(id) {
        return this.postService.delete(Number(id));
    }
    ckeUpload(data, file) {
        return {
            'url': file.path
        };
    }
    async uploadMultiImage(id, dto, images) {
        const post = await this.postRepository.findOneBy({ id });
        let kq = "";
        for (let image of images) {
            const url = await this.cloudinaryService.uploadImage(image);
            kq += url.url.toString() + ',';
        }
        let kq1 = kq.substring(0, kq.length - 1);
        post.thumbnail = kq1;
        await this.postRepository.save(post);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
                status: { type: 'number' }
            }
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: cloudinary_multer_1.storage })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_post_dto_1.FilterPostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "findDetail", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: cloudinary_multer_1.storage })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, update_post_dto_1.UpdatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('cke-upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: cloudinary_multer_1.storage })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "ckeUpload", null);
__decorate([
    (0, common_1.Post)('images'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, upload_images_dto_1.UploadImagesDto, Array]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "uploadMultiImage", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Posts'),
    (0, common_1.Controller)('posts'),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        post_service_1.PostService,
        cloudinary_service_1.CloudinaryService])
], PostController);
//# sourceMappingURL=post.controller.js.map