import { Module } from '@nestjs/common';
import { StockItemController } from './stock-item.controller';
import { StockItemService } from './stock-item.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { StockItem } from '@/modules/stock-item/entities/stock-item.entity';
import { InventoryModule } from '../inventory/inventory.module';
import { SupplyInvoiceModule } from '../supply-invoice/supply-invoice.module';
import { SaleItemModule } from '../sale-item/sale-item.module';

@Module({
  imports: [
    SequelizeModule.forFeature([StockItem]),
    InventoryModule,
    SupplyInvoiceModule,
    SaleItemModule,
  ],
  controllers: [StockItemController],
  providers: [StockItemService],
})
export class StockItemModule {}
