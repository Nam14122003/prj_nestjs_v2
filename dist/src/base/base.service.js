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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
let BaseService = exports.BaseService = class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    async actionPreCreate(dto) {
        return dto;
    }
    async actionPostCreate(record) {
        return record;
    }
    async create(dto) {
        const handleDto = await this.actionPreCreate(dto);
        const record = await this.repository.save(handleDto);
        return this.actionPostCreate(record);
    }
    async actionPreGetList(dto) {
        return dto;
    }
    async actionGetList(records) {
        return records;
    }
    async getList(dto) {
        const handleDto = await this.actionPreGetList(dto);
        const records = await this.repository.find(handleDto);
        return this.actionGetList(records);
    }
    async actionPreDetail(id) {
        return id;
    }
    async actionPostDetail(record) {
        return record;
    }
    async getDetail(id) {
        const handleId = await this.actionPreDetail(id);
        const record = await this.repository.findOneBy({ id: handleId });
        return this.actionPostDetail(record);
    }
    async actionPreUpdate(id, dto) {
        return dto;
    }
    async actionPostUpdate(record) {
        return record;
    }
    async update(id, dto) {
        const handleDto = await this.actionPreUpdate(id, dto);
        await this.repository.update({ id: id }, handleDto);
        const updatedRecord = await this.repository.findOneBy({ id: id });
        return this.actionPostUpdate(updatedRecord);
    }
    async actionPreDelete(id) {
        return id;
    }
    async actionPostDelete() {
    }
    async delete(id) {
        const handleId = await this.actionPreDelete(id);
        await this.repository.delete(handleId);
        return this.actionPostDelete();
    }
};
exports.BaseService = BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], BaseService);
//# sourceMappingURL=base.service.js.map