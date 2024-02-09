import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Type {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;

    @OneToMany(() => Product, product => product.type)
    products: Product[]
}
