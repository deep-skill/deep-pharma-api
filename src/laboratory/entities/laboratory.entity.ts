import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Laboratory {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  name: string;
}
