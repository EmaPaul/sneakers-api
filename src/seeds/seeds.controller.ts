import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeedsService } from './seeds.service';


@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService){}

  @Get('data')
  findAll() {
    return this.seedsService.findAll();
  }

}
