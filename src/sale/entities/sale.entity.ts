import { Lot } from "src/lot/entities/lot.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('float')
    total: number;

    @Column('date')
    sale_date: Date;

    @Column('text')
    sale_type: string;

    @ManyToOne(() => User, (user) => user.sales)
    user: User

    @ManyToMany(() => Lot)
    @JoinTable()
    lots: Lot[]

}
