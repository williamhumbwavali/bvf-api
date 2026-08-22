import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

import { ENTITIES } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
      ],

      inject: [
        ConfigService,
      ],

      useFactory: (
        config: ConfigService,
      ) => ({
        type: 'postgres',

        url: config.getOrThrow(
          'DATABASE_URL',
        ),

        entities: ENTITIES,

        synchronize:
          config.get('NODE_ENV') ===
          'development',

        autoLoadEntities: true,
      }),
    }),
  ],

  exports: [
    TypeOrmModule,
  ],
})
export class DatabaseModule {}