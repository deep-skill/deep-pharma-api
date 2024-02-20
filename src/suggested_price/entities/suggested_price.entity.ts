import { ClassGlobal } from "src/class_global/class_global.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SuggestedPrice extends ClassGlobal{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('float')
    price: number;

    @Column('date')
    date_time: Date

    @ManyToOne(() => Product, (product) => product.price)
    @JoinColumn({ name: 'product_id' })
    products: Product
}
