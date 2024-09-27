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
const config_1 = require("../../../helpers/config");
const auth_guard_1 = require("../auth/auth.guard");
const path_1 = require("path");
const post_service_1 = require("./post.service");
const filter_post_dto_1 = require("./dto/filter-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const swagger_1 = require("@nestjs/swagger");
let PostController = exports.PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    create(req, createPostDto, file) {
        if (req.fileValidationError) {
            throw new common_1.BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new common_1.BadRequestException('File is required!');
        }
        return this.postService.create(req['user_data'].id, { ...createPostDto, thumbnail: file.destination + '/' + file.filename });
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
            dto.thumbnail = +'post/' + file.filename;
        }
        return this.postService.update(Number(id), dto);
    }
    delete(id) {
        return this.postService.delete(Number(id));
    }
    ckeUpload(data, file) {
        return {
            'url': `ckeditor/${file.filename}`
        };
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('thumbnail', {
        storage: (0, config_1.storageConfig)('post'),
        fileFilter: (req, file, cb) => {
            const ext = (0, path_1.extname)(file.originalname);
            const allowedExtArr = ['.jpg', '.png', '.jpeg'];
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationError = `Wrong extension type. Acept file ext are: ${allowedExtArr.toString()}`;
                cb(null, false);
            }
            else {
                const fileSize = parseInt(req.headers['content-length']);
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'File size is too large. Acept fize size is lass than 5 MB';
                    ;
                    cb(null, false);
                }
                else {
                    cb(null, true);
                }
            }
        }
    })),
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('thumbnail', {
        storage: (0, config_1.storageConfig)('post'),
        fileFilter: (req, file, cb) => {
            const ext = (0, path_1.extname)(file.originalname);
            const allowedExtArr = ['.jpg', '.png', '.jpeg'];
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationError = `Wrong extension type. Acept file ext are: ${allowedExtArr.toString()}`;
                cb(null, false);
            }
            else {
                const fileSize = parseInt(req.headers['content-length']);
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'File size is too large. Acept fize size is lass than 5 MB';
                    ;
                    cb(null, false);
                }
                else {
                    cb(null, true);
                }
            }
        }
    })),
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
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('upload', {
        storage: (0, config_1.storageConfig)('ckeditor'),
        fileFilter: (req, file, cb) => {
            const ext = (0, path_1.extname)(file.originalname);
            const allowedExtArr = ['.jpg', '.png', '.jpeg'];
            if (!allowedExtArr.includes(ext)) {
                req.fileValidationError = `Wrong extension type. Acept file ext are: ${allowedExtArr.toString()}`;
                cb(null, false);
            }
            else {
                const fileSize = parseInt(req.headers['content-length']);
                if (fileSize > 1024 * 1024 * 5) {
                    req.fileValidationError = 'File size is too large. Acept fize size is lass than 5 MB';
                    ;
                    cb(null, false);
                }
                else {
                    cb(null, true);
                }
            }
        }
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "ckeUpload", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Posts'),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map