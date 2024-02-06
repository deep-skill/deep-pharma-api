import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Drug {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    therapeutic_function: string;
}