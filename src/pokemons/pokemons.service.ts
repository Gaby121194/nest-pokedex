import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonsService {

  defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService){

      this.defaultLimit = configService.get('defaultLimit')
      console.log(this.defaultLimit)
    }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleErrors(error)
    }
   
  }

  findAll(paginationdto: PaginationDto) {
    console.log({paginationdto})
    const {offset= 0, limit= this.defaultLimit} = paginationdto
    return this.pokemonModel.find()
                            .skip(offset)
                            .limit(limit)
                            .sort({no: 1})
                            .select('-__v');
  }

  async findOne(term: string) {
    let pokemon : Pokemon;
    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no: term})
    }
    if(isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term)
    }
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name: term.toLowerCase().trim()})
    }

    if(!pokemon) throw new NotFoundException(`Pokemon with id, no or name '${term}' not found`)
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term)
    if(updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim()
    try {
      await pokemon.updateOne(updatePokemonDto)
      return {...pokemon.toJSON(), ...updatePokemonDto};
    } catch (error) {
      this.handleErrors(error)
    }
   
  }

  async remove(id: string) {
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id})
    if(deletedCount === 0) throw new BadRequestException(`Pokemon with id "${id}" is not found`)
    return;
  }

  handleErrors(error: any){
    if(error.code === 11000){
      throw new BadRequestException(`Pokemon exists in DB ${ JSON.stringify(error.keyValue) }`)
    }
    else throw new InternalServerErrorException(`Can't create pokemon - Check de logs in server`)
  }
}
