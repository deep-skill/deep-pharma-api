import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Drug {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    therapeutic_function: string;

    @Column('text')
    concentration: string;

    @OneToMany(() => Product, product => product.drug)
    products: Product[]
}