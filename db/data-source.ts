import { DataSourceOptions, DataSource } from 'typeorm';

export const dataSourceOptios : DataSourceOptions =  {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "hoadev",
    password: "hoadev123",
    database: "hoadev_db",
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: true
}

const dataSource = new DataSource(dataSourceOptios);
export default dataSource;