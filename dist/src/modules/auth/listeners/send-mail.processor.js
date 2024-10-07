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
exports.SendMailProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const mailer_1 = require("@nestjs-modules/mailer");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_2 = require("typeorm");
let SendMailProcessor = exports.SendMailProcessor = class SendMailProcessor {
    constructor(userRepository, mailerService) {
        this.userRepository = userRepository;
        this.mailerService = mailerService;
    }
    async handleSendMailJob(job) {
        console.log(job.data);
        const users = await this.userRepository.find();
        for (const user of users) {
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Post Your Article at ngocnam',
                template: 'remind',
                context: {
                    name: user.lastName,
                },
            });
        }
        console.log(job);
    }
};
exports.SendMailProcessor = SendMailProcessor = __decorate([
    (0, bull_1.Processor)('sendMailQueue'),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], SendMailProcessor);
//# sourceMappingURL=send-mail.processor.js.map