import { Module } from '@nestjs/common';
import { ParcelService } from './geom-data.service';
import { ParcelController } from './geom-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcel } from './entities/geom-datum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Parcel])],
  controllers: [ParcelController],
  providers: [ParcelService]
})
export class GeomDataModule {}
