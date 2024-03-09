import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SneakersService } from './sneakers.service';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { FilterSneakersDto } from 'src/common/dto/filterSneakers.dto';


@Controller('sneakers')
export class SneakersController {
  constructor(private readonly sneakersService: SneakersService) {}

  @Post()
  create(@Body() createSneakerDto: CreateSneakerDto) {
    return this.sneakersService.create(createSneakerDto);
  }

  @Get()
  filterAll(@Query() queryParameter:FilterSneakersDto) {
    return this.sneakersService.findSneakersQuery(queryParameter);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.sneakersService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term',ParseMongoIdPipe) term: string, @Body() updateSneakerDto: UpdateSneakerDto) {
    return this.sneakersService.update(term, updateSneakerDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.sneakersService.remove(id);
  }
}
