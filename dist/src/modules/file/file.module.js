"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const common_1 = require("@nestjs/common");
const file_controller_1 = require("./file.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const file_service_1 = require("./file.service");
const auth_service_1 = require("../auth/auth.service");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("../auth/auth.module");
let FileModule = exports.FileModule = class FileModule {
};
exports.FileModule = FileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            auth_module_1.AuthModule,
            config_1.ConfigModule
        ],
        controllers: [file_controller_1.ExportController],
        providers: [file_service_1.FileService, auth_service_1.AuthService, config_1.ConfigService]
    })
], FileModule);
//# sourceMappingURL=file.module.js.map