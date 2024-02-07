import { Lot } from "src/lot/entities/lot.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  name: string;
  @Column()
  phone_number: number;
  @Column()
  email: string;
  @Column()
  address: string;

  @OneToMany(() => Lot, (lot) => lot.supplier)
  lots: Lot[]
}
