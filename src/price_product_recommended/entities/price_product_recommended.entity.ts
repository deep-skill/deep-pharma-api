import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PriceProductRecommended {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('float')
    price: number;

    @Column('date')
    date_time: Date

    @ManyToOne(() => Product, (product) => product.price)
    @JoinColumn({ name: 'product_id' })
    product_id: Product
}
