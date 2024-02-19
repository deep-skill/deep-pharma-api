import { ClassGlobal } from "src/class_global/class_global.entity";
import { Lot } from "src/lot/entities/lot.entity";
import { SaleLot } from "src/sale_lot/entity/sale_lot.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale extends ClassGlobal {
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


    @OneToMany(() => SaleLot, (saleLot) => saleLot.sale)
    saleLots: SaleLot[];

}
