import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Laboratory {
  @PrimaryGeneratedColumn("increment")
  id: number;
  
  @Column('text')
  name: string;

  @OneToMany(() => Product, product => product.laboratory)
  products: Product[]
}
