import { Injectable } from '@nestjs/common';
import { PokemonResponse } from './interface/pokeResponse.interface';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axiosAdapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
  private readonly pokemonModel: Model<Pokemon>,
  private readonly http: AxiosAdapter) {}

  async executeSeed(){

    await this.pokemonModel.deleteMany(); 
    const pokemonsToInsert : {name: string, no: number}[] = [];
    const data = await this.http.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')

    data.results.forEach(({name, url}) =>{
      const segments = url.split('/')
      const no = +segments[segments.length - 2]
      pokemonsToInsert.push( {name,no} )
      

    })

    await this.pokemonModel.insertMany(pokemonsToInsert);
    return `SEED Executed`
  }
}
