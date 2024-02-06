import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  name: string;
  @Column()
  phone: number;
  @Column()
  email: string;
  @Column()
  address: string;
}
