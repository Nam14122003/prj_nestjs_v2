"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("../db/data-source");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const post_module_1 = require("./post/post.module");
const category_module_1 = require("./category/category.module");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./auth/roles.guard");
const auth_guard_1 = require("./auth/auth.guard");
const user_entity_1 = require("./user/entities/user.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(data_source_1.dataSourceOptios),
            user_module_1.UserModule, auth_module_1.AuthModule, config_1.ConfigModule.forRoot(),
            post_module_1.PostModule, category_module_1.CategoryModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: process.env.MAILDEV_INCOMING_USER,
                            pass: process.env.MAILDEV_INCOMING_PASS,
                        },
                    },
                    defaults: {
                        from: '"No Reply" <no-reply@localhost>',
                    },
                    preview: true,
                    template: {
                        dir: process.cwd() + '/src/mail/templates/',
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService]
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map