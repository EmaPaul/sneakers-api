import { IsNumber, IsOptional, IsPositive, IsString, Matches, Min } from "class-validator";

export class FilterSneakersDto{
    @IsOptional()
    @IsPositive()
    @Min(1)
    @IsNumber()
    limit?:number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    offset?:number;
    

    @IsString()
    @IsOptional()
    brand?:string;
}