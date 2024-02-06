import { Test, TestingModule } from '@nestjs/testing';
import { SaleLotController } from './sale_lot.controller';
import { SaleLotService } from './sale_lot.service';

describe('SaleLotController', () => {
  let controller: SaleLotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleLotController],
      providers: [SaleLotService],
    }).compile();

    controller = module.get<SaleLotController>(SaleLotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
