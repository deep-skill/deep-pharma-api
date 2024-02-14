import { Role } from "src/role/entities/role.entity";
import { Sale } from "src/sale/entities/sale.entity";
import {
  Column,
  Entity,
  JoinColumn,
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
  last_name: string;
  @Column("text")
  email: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[]
}
