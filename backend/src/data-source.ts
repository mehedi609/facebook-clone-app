import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './config';

const {
  database: { host, port, password, username, database },
} = config;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entity/**/*{.ts,.js}`],
  migrations: [`${__dirname}/migration/**/*{.ts,.js}`],
  subscribers: [],
});
