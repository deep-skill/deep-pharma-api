import { ClassGlobal } from "src/class_global/class_global.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Drug extends ClassGlobal{
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