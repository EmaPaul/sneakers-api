import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sneaker } from 'src/sneakers/entities/sneaker.entity';
import {Sneakers} from './data/sneakers'


@Injectable()
export class SeedsService {
  constructor(
    @InjectModel(Sneaker.name)
    private readonly sneakerModel:Model<Sneaker>
  ){}
  async findAll() {
    await this.sneakerModel.deleteMany();
    const data = Sneakers;
    const sneakerToInsert:{brand:string, sneakerModel:string, year:number, price:number}[] = []
   
    data.forEach(async({brand,sneakerModel,year,price})=>{
      sneakerToInsert.push({
        brand,
        sneakerModel,
        year,
        price
      })
    })

    await this.sneakerModel.insertMany(sneakerToInsert);

    return "Seed Executed";
  }
}
