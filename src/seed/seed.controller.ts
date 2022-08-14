import { Controller, Get} from '@nestjs/common';
import { SeedService } from './seed.service';
import axios from 'axios'
import { PokemonResponse } from './interface/pokeResponse.interface';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

 

  @Get()
  async executeSeed() {
    const {data} = await axios.get<PokemonResponse>('https://pokeapi.co/api/v2/pokemon?limit=100')

    const pokemons = data.results.forEach(({name, url}) =>{
      const segments = url.split('/')
      const no = +segments[segments.length - 2]
      return {name,no}

    })
    return pokemons;
  }

}
