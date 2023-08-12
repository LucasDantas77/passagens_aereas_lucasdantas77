import "dotenv/config";
import "reflect-metadata";
import path from "path";

import { DataSource, DataSourceOptions } from "typeorm";
const entitesPatch: string = path.join(__dirname, "./entities/**.{ts,js}");
const migrationPatch: string = path.join(__dirname, "./migration/**.{ts,js}");

const dataSourceConfig = (): DataSourceOptions => {
  const dbUrl: string | undefined = process.env.DATABASE_URL;

  if (!dbUrl) {
    throw new Error("Env var DATABASE_URL does not exists");
  }
  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitesPatch],
    };
  }
  return {
    type: "postgres",
    url: dbUrl,
    synchronize: false,
    logging: true,
    migrations: [migrationPatch],
    entities: [entitesPatch],
  };
};

const AppDataSource = new DataSource(dataSourceConfig());

export { AppDataSource };
