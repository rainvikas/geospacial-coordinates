import { PartialType } from '@nestjs/mapped-types';
import { createMapDto } from './create-geom-datum.dto';

export class UpdateMapDto extends PartialType(createMapDto) {}
