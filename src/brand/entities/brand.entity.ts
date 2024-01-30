import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Brand {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;
}
