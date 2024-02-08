import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  phone_number: number;
  @Column()
  name: string;
}
