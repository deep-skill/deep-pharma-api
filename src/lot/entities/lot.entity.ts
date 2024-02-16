import { Product } from "src/product/entities/product.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lot {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('float')
    initial_stock: number;

    @Column('float')
    updated_stock: number;

    @Column('date')
    expiration: Date;

    @Column('bool')
    lot_state: boolean;

    @Column('float')
    cost_price: number;

    @ManyToOne(() => Supplier, (supplier) => supplier.lots)
    @JoinColumn({ name: 'supplier_id' })
    supplier: Supplier

    @ManyToOne(() => Product, (product) => product.lots)
    @JoinColumn({ name: 'product_id' })
    product: Product
}