import { Test, TestingModule } from '@nestjs/testing';
import { ParcelService } from './geom-data.service';

describe('GeomDataService', () => {
  let service: ParcelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParcelService],
    }).compile();

    service = module.get<ParcelService>(ParcelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
