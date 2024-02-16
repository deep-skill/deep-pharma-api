import { ClassGlobal } from "src/class_global/class_global.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role extends ClassGlobal {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;
  
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
