import { ClassGlobal } from "src/class_global/class_global.entity";
import { Product } from "src/product/entities/product.entity";
import { SaleLot } from "src/sale_lot/entity/sale_lot.entity";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lot extends ClassGlobal {
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

    @OneToMany(() => SaleLot, (saleLot) => saleLot.lot)
    saleLots: SaleLot[];
}