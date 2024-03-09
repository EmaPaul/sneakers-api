import {IsString, IsPositive, IsInt, IsNumber} from 'class-validator'

export class CreateSneakerDto{
    @IsString()
    brand: string;

    @IsString()
    sneakerModel: string;

    @IsInt()
    @IsPositive()
    year: number;

    @IsNumber()
    @IsPositive()
    price: number
}
