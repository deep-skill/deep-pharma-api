import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PriceProductRecommended {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('float')
    price: number;

    @Column('date')
    date_time: Date
}
