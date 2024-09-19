"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Blog Api')
        .setDescription('The list API for simple blog')
        .setVersion('1.0')
        .addTag('Auth')
        .addTag('Users')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    app.useStaticAssets((0, path_1.join)(__dirname, '../uploads'));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map