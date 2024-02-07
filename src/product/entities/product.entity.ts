import { Drug } from "src/drug/entities/drug.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('text')
    additional_info: string;

    @Column('float')
    price: number;
    
    @Column('boolean')
    prescription_required: boolean;

    @Column('boolean')
    is_medicine: boolean;

    @Column('boolean')
    is_fractionable: boolean;

    @ManyToOne(() => Drug , drug => drug.products)
    drug: Drug
}
