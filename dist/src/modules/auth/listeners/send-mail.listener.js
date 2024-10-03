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
exports.SendMailListener = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const bull_1 = require("@nestjs/bull");
let SendMailListener = exports.SendMailListener = class SendMailListener {
    constructor(userRepository, sendMailQueue) {
        this.userRepository = userRepository;
        this.sendMailQueue = sendMailQueue;
    }
    async handleOrderCreatedEvent(payload) {
        await this.sendMailQueue.add('sendMailJob', {
            payload,
        });
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('send mail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SendMailListener.prototype, "handleOrderCreatedEvent", null);
exports.SendMailListener = SendMailListener = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, bull_1.InjectQueue)('sendMailQueue')),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], SendMailListener);
//# sourceMappingURL=send-mail.listener.js.map