import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandModule } from './brand/brand.module';
import { DrugModule } from './drug/drug.module';
import { PresentationModule } from './presentation/presentation.module';
import { ProductModule } from './product/product.module';
import { LotModule } from './lot/lot.module';
import { SupplierModule } from './supplier/supplier.module';
import { SaleLotModule } from './sale_lot/sale_lot.module';
import { SaleModule } from './sale/sale.module';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { TypeModule } from './type/type.module';
import { PriceProductRecommendedModule } from './price_product_recommended/price_product_recommended.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true
    }),
    BrandModule,
    DrugModule,
    PresentationModule,
    ProductModule,
    LotModule,
    SupplierModule,
    SaleLotModule,
    SaleModule,
    CustomerModule,
    UserModule,
    RoleModule,
    TypeModule,
    PriceProductRecommendedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
