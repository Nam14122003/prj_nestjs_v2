import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptios : DataSourceOptions =  {
    type: "mysql",
    host: "localhost",
    port: 33061,
    username: "root",
    password: "root",
    database: "blog-nestjs",
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: true
}

const dataSource = new DataSource(dataSourceOptios);
export default dataSource;