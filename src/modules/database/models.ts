import { ConcentrationUnit } from '../concentration-unit/entities/concentration-unit.entity';
import { Drugstore } from '../drugstore/entities/drugstore.entity';
import { Inventory } from '../inventory/entities/inventory.entity';
import { Provider } from '../provider/entities/provider.entity';
import { SaleItem } from '../sale-item/entities/sale-item.entity';
import { StockItem } from '../stock-item/entities/stock-item.entity';
import { SupplyInvoice } from '../supply-invoice/entities/supply-invoice.entity';
import { Venue } from '../venue/entities/venue.entity';
import { Brand } from '../brand/entities/brand.entity';
import { Product } from '../product/entities/product.entity';
import { Tag } from '../tag/entities/tag.entity';
import { ProductTag } from '../product/entities/product-tag.entity';

export const models = [
  ConcentrationUnit,
  Drugstore,
  Inventory,
  Provider,
  SaleItem,
  StockItem,
  SupplyInvoice,
  Venue,
  Brand,
  Product,
  Tag,
  ProductTag,
];
