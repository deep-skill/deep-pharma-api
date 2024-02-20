import { ClassGlobal } from "src/class_global/class_global.entity";
import { Sale } from "src/sale/entities/sale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer extends ClassGlobal {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  phone_number: number;
  
  @Column()
  name: string;

  @OneToMany(() => Sale, sale => sale.customer)
  sale: Sale[]
}
