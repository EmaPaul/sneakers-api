import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Sneaker extends Document{
    @Prop({
        index:true
    })
    brand:string;

    @Prop({
        index:true,
        unique:true
    })
    sneakerModel:string;

    @Prop({
        index:true
    })
    year:number;

    @Prop({
        index:true
    })
    price:number;
}

export const SneakerSchema = SchemaFactory.createForClass(Sneaker);