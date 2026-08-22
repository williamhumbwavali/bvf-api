import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { ENTITIES } from './entities';

export default new DataSource({
  type: 'postgres',

  url: process.env.DATABASE_URL,

  entities: ENTITIES,

  migrations: [
    'src/database/migrations/*.ts',
  ],
});