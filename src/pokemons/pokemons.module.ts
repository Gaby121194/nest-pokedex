import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonsController],
  providers: [PokemonsService],
  imports: [ ConfigModule,
    MongooseModule.forFeature([
    {
      name: Pokemon.name,
      schema: PokemonSchema
  }])],
  exports: [MongooseModule]
})
export class PokemonsModule {}
