"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptios = void 0;
const typeorm_1 = require("typeorm");
exports.dataSourceOptios = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "hoadev",
    password: "hoadev123",
    database: "hoadev_db",
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: true
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptios);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map