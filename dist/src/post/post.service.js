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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const post_entity_1 = require("./entities/post.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
let PostService = exports.PostService = class PostService {
    constructor(useRepository, postRepository) {
        this.useRepository = useRepository;
        this.postRepository = postRepository;
    }
    async create(userId, dto) {
        const user = await this.useRepository.findOneBy({ id: userId });
        try {
            const res = await this.postRepository.save({
                ...dto, user
            });
            return await this.postRepository.findOneBy({ id: res.id });
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException('Cannot create post', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(query) {
        const itemPerPage = Number(query.itemPerPage) || 10;
        const page = Number(query.page) || 1;
        const search = query.search || '';
        const category = Number(query.category) || null;
        const skip = (page - 1) * itemPerPage;
        const [res, total] = await this.postRepository.findAndCount({
            where: [
                {
                    title: (0, typeorm_2.Like)('%' + search + '%'),
                    category: {
                        id: category
                    }
                },
                {
                    description: (0, typeorm_2.Like)('%' + search + '%'),
                    category: {
                        id: category
                    }
                }
            ],
            order: { createdAt: 'DESC' },
            take: itemPerPage,
            skip: skip,
            relations: {
                user: true,
                category: true
            },
            select: {
                category: {
                    id: true,
                    name: true
                },
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    avatar: true
                }
            }
        });
        const lastPage = Math.ceil(total / itemPerPage);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;
        return {
            data: res,
            total,
            currenPage: page,
            nextPage,
            prevPage,
            lastPage
        };
    }
    async findDetail(id) {
        return await this.postRepository.findOne({
            where: { id },
            relations: ['user', 'category'],
            select: {
                category: {
                    id: true,
                    name: true
                },
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    avatar: true
                }
            }
        });
    }
    async update(id, dto) {
        return await this.postRepository.update(id, dto);
    }
    async delete(id) {
        return await this.postRepository.delete(id);
    }
};
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map