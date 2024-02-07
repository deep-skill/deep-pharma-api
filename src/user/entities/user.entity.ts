import { Role } from "src/role/entities/role.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
