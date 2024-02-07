import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Presentation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text',{
        nullable: true,
    })
    name: string;

    @Column('int')
    factor: number;

    @OneToMany(() => Product, product => product.presentation)
    products: Product[]
}
