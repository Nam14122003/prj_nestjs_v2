export declare class BaseService<T> {
    protected readonly repository: any;
    constructor(repository: any);
    actionPreCreate(dto: Partial<T>): Promise<Partial<T>>;
    actionPostCreate(record: T): Promise<T>;
    create(dto: Partial<T>): Promise<T>;
    actionPreList(dto: any): Promise<any>;
    actionPostList(records: T[]): Promise<T[]>;
    getList(dto: any): Promise<T[]>;
    actionPreDetail(id: number): Promise<number>;
    actionPostDetail(record: T): Promise<T>;
    getDetail(id: number): Promise<T>;
    actionPreUpdate(id: number, dto: Partial<T>): Promise<Partial<T>>;
    actionPostUpdate(record: T): Promise<T>;
    update(id: number, dto: Partial<T>): Promise<T>;
    actionPreDelete(id: number): Promise<number>;
    actionPostDelete(): Promise<void>;
    delete(id: number): Promise<void>;
}
