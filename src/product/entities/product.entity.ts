import { Brand } from "src/brand/entities/brand.entity";
import { Drug } from "src/drug/entities/drug.entity";
import { Laboratory } from "src/laboratory/entities/laboratory.entity";
import { Lot } from "src/lot/entities/lot.entity";
import { Presentation } from "src/presentation/entities/presentation.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('text', { 
        nullable: true 
    })
    additional_info: string;

    @Column('float')
    price: number;
    
    @Column('boolean')
    prescription_required: boolean;

    @Column('boolean')
    is_medicine: boolean;

    @Column('boolean')
    is_fractionable: boolean;

    @ManyToOne(() => Drug, { nullable: true })
    drug?: Drug | null;

    @ManyToOne(() => Laboratory, { nullable: true })
    laboratory?: Laboratory | null;

    @ManyToOne(() => Presentation, { nullable: true })
    presentation?: Presentation | null;

    @ManyToOne(() => Brand , presentation => presentation.products)
    brand?: Brand

    @OneToMany(() => Lot, lot => lot.product)
    lots: Lot[]
}
