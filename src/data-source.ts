import "reflect-metadata"
import { DataSource } from "mysql"
import {  } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mysql123",
    database: "cms",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: [],
    subscribers: []
})
