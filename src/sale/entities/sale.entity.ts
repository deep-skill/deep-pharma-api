import { Lot } from "src/lot/entities/lot.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToMany(() => Lot)
    @JoinTable(
        {
            name: 'sale_lots_lot',
            joinColumn: {
                name: 'sale_id',
                referencedColumnName: 'id'
            },
            inverseJoinColumn: {
                name: 'lot_id',
                referencedColumnName: 'id'
            }
        }
    )
    lots: Lot[]

}
