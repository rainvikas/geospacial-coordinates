import { Test, TestingModule } from '@nestjs/testing';
import { GeomDataController } from './geom-data.controller';
import { GeomDataService } from './geom-data.service';

describe('GeomDataController', () => {
  let controller: GeomDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeomDataController],
      providers: [GeomDataService],
    }).compile();

    controller = module.get<GeomDataController>(GeomDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
