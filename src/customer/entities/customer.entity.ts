import { ClassGlobal } from "src/class_global/class_global.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer extends ClassGlobal {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  phone_number: number;
  
  @Column()
  name: string;
}
