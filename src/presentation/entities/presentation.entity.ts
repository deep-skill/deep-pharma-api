import { ClassGlobal } from "src/class_global/class_global.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Presentation extends ClassGlobal {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text',{
        nullable: true,
    })
    name: string;

    @Column('int')
    quantity: number;

    @OneToMany(() => Product, product => product.presentation)
    products: Product[]
}
