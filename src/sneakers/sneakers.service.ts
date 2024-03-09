import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sneaker } from './entities/sneaker.entity';
import { FilterQuery, Model, isValidObjectId } from 'mongoose';
import { FilterSneakersDto } from 'src/common/dto/filterSneakers.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class SneakersService {
  private defaultLimit:number;
  
  constructor(
    @InjectModel(Sneaker.name)
    private readonly sneakerModel:Model<Sneaker>,
    private readonly configService:ConfigService,
  ){
    this.defaultLimit = this.configService.get<number>('defaultLimit')
  }
  
    
  async create(createSneakerDto: CreateSneakerDto) {
    try{
      createSneakerDto.brand = createSneakerDto.brand[0].toUpperCase() + createSneakerDto.brand.slice(1);
      createSneakerDto.sneakerModel = createSneakerDto.sneakerModel[0].toUpperCase() + createSneakerDto.sneakerModel.slice(1).toLowerCase();
      const sneaker = await this.sneakerModel.create(createSneakerDto);
      return sneaker;
    }catch(err){
      this.handleExceptions(err,"create");
    }
  }

 
  async findSneakersQuery(filter?:FilterSneakersDto){
    const {limit=this.defaultLimit,offset=0,brand} = filter;
    let filters:FilterQuery<Sneaker>={}

    if(filter){
      if(brand){
        filters={
          brand:{
            $regex: brand,
            $options: "i"
          },
          ...filters
        }
      }
    }

    const sneakers = await this.sneakerModel.find(filters)
        .limit(limit)
        .skip(offset)
        .select("-__v");
    
    return sneakers;
  }


  async findOne(term: string) {
    let sneaker:Sneaker;

    if(!sneaker && isValidObjectId(term)){
      sneaker = await this.sneakerModel.findById(term);
    }

    if(!sneaker){
      sneaker = await this.sneakerModel.findOne({
          sneakerModel: term[0].toUpperCase() + term.slice(1)
      })
    }

    if(!sneaker){
      throw new NotFoundException(`Sneaker with model or id "${term}" not found`)
    }
    
    return sneaker;
  }

  async update(term: string, updateSneakerDto: UpdateSneakerDto) {
    try{
      const sneaker = await this.findOne(term);
      if(updateSneakerDto.sneakerModel){
        updateSneakerDto.sneakerModel = updateSneakerDto.sneakerModel[0].toUpperCase() + updateSneakerDto.sneakerModel.slice(1).toLowerCase();
      }

      await sneaker.updateOne(updateSneakerDto);
      return {...sneaker.toJSON(), ...updateSneakerDto};
    }catch(err){
      this.handleExceptions(err,"update");
    }
  }

  async remove(id: string) {
    const {deletedCount} = await this.sneakerModel.deleteOne({_id:id});
    if(deletedCount === 0)
      throw new BadRequestException(
        `Sneaker with id "${id}" not found`
      )
      return;
  }

  private handleExceptions(err: any, typeInternal: string){
    if(err.code === 11000){
      throw new BadRequestException(`Sneaker Model exists is db ${JSON.stringify(err.keyValue)}`);
    }
    throw new InternalServerErrorException(`Can't ${typeInternal} Sneaker check server logs`)
  }
}
