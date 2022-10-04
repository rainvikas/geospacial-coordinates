import { Delete, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeoJSON } from 'geojson';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import { Parcel } from './entities/geom-datum.entity';

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(Parcel) private readonly Parcel: Repository<Parcel>,
  ) {}

  async createParcel(createParcelPointDto: Parcel): Promise<any> {
    console.log('this is come from mao service', createParcelPointDto);
    let data = {
      name: createParcelPointDto.name,
      desc: createParcelPointDto.desc,
      color: createParcelPointDto.color,
      geom: createParcelPointDto.geom.geometry
    };
    console.log('This data form from after destructuring', data);
    const map = this.Parcel.create(data);
    await this.Parcel.save(map);
  }

  find() {
    return this.Parcel.find();
  }

  deleteData(id:number):Observable<DeleteResult>{
    return from(this.Parcel.delete(id))
  }
}
