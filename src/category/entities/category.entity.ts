import { ClassGlobal } from "src/class_global/class_global.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category  extends ClassGlobal {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;

    @OneToMany(() => Product, product => product.category)
    products: Product[]
}
