module.exports = [
  {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mysql123",
    database: "cms",
    synchronize: true,
    logging: false,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"]
  }
]
