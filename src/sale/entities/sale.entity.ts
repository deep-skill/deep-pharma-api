import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn('increment')
    id: number;

    //@Column('date')
   // date: Date;

    @Column('float')
    total: number;

    @Column('text')
    sale_type: string;


}
