import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { get } from 'http';
import { from, Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { Parcel } from './entities/geom-datum.entity';
import { ParcelService } from './geom-data.service';

@Controller('gisdata')
export class ParcelController {
 
  constructor(private parcelService: ParcelService) {}

  @Post('create')
  async createParcelPoint(
    @Body()
    createParcelPointDto: Parcel,
  ): Promise<Parcel> {
    //console.log('line nu 14', createParcelPointDto);
    //console.log("this is come from map controller", createParcelPointDto)
    return this.parcelService.createParcel(createParcelPointDto);
  }
  @Get('alldata')
  findall() {
    return this.parcelService.find();
  }
  @Delete("/:id")
     deletegeomData(@Param()id:number):Observable<DeleteResult>{
      return from(this.parcelService.deleteData(id))
     }
}
