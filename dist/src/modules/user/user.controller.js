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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const fillter_user_dto_1 = require("./dto/fillter-user.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("../../../helpers/config");
const path_1 = require("path");
const role_decorator_1 = require("../auth/decorator/role.decorator");
const local_auth_guard_1 = require("../auth/jwt/local-auth.guard");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    findAll(query) {
        return this.userService.findAll(query);
    }
    profile(req) {
        return this.userService.findOne(Number(req.user_data.id));
    }
    findOne(id) {
        return this.userService.findOne(Number(id));
    }
    create(dto) {
        return this.userService.create(dto);
    }
    update(id, dto) {
        return this.userService.update(Number(id), dto);
    }
    multipleDelete(ids) {
        console.log("delete multi=> ", ids);
        return this.userService.mutipleDelete(ids);
    }
    delete(id) {
        return this.userService.delete(Number(id));
    }
    uploadAvatar(req, file) {
        if (req.fileValidationError) {
            throw new common_1.BadRequestException(req.fileValidationError);
        }
        if (!file) {
            throw new common_1.BadRequestException('File is required!');
        }
        this.userService.updateAvatar(req.user_data.id, file.fieldname + '/' + file.fieldname);
    }
};
__decorate([
    (0, role_decorator_1.Roles)('Admin'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fillter_user_dto_1.FillterUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "profile", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, role_decorator_1.Roles)('Admin'),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)('Admin'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, role_decorator_1.Roles)('Admin'),
    (0, common_1.Delete)('multiple'),
    __param(0, (0, common_1.Query)('ids', new common_1.ParseArrayPipe({ items: String, separator: ',' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "multipleDelete", null);
__decorate([
    (0, role_decorator_1.Roles)('Admin'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                }
            }
        },
    }),
    (0, common_1.Post)('upload-avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        storage: (0, config_1.storageConfig)('avatar'),
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
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadAvatar", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map