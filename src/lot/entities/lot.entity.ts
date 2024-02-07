import { Supplier } from "src/supplier/entities/supplier.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Supplier, (supplier) => supplier.lots)
    supplier: Supplier
}