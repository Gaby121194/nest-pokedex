import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonsModule } from './pokemons/pokemons.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfigurations } from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfigurations]
    }),

    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB)
    ,
    PokemonsModule,
    CommonModule,
    SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  
}
