"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const user_entity_1 = require("../user/entities/user.entity");
const cloudinary_provider_1 = require("../../cloudinary/cloudinary.provider");
const cloudinary_service_1 = require("../../cloudinary/cloudinary.service");
let PostModule = exports.PostModule = class PostModule {
};
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([post_entity_1.Post, user_entity_1.User]),
            config_1.ConfigModule
        ],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService, cloudinary_provider_1.CloudinaryProvider, cloudinary_service_1.CloudinaryService]
    })
], PostModule);
//# sourceMappingURL=post.module.js.map