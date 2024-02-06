import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Presentation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    factor: number;
}
