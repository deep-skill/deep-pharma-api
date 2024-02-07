import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column("text")
  name: string;
  @Column("text")
  lastName: string;
  @Column("int", {
    unique: true,
  })
  dni: number;
  @Column()
  password: string;
}
