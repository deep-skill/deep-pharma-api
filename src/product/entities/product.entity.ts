import { Brand } from "src/brand/entities/brand.entity";
import { Drug } from "src/drug/entities/drug.entity";
import { Lot } from "src/lot/entities/lot.entity";
import { Presentation } from "src/presentation/entities/presentation.entity";
import { Type } from "src/type/entities/type.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    @JoinColumn({ name: 'drug_id' })
    drug?: Drug | null;

    @ManyToOne(() => Presentation, { nullable: true })
    @JoinColumn({ name: 'presentation_id' })
    presentation?: Presentation | null;

    @ManyToOne(() => Brand , presentation => presentation.products)
    @JoinColumn({ name: 'brand_id' })
    brand?: Brand

    @ManyToOne(() => Type, lot => lot.products)
    @JoinColumn({ name: 'type_id' })
    type: Type

    @OneToMany(() => Lot, lot => lot.product)
    lots: Lot[]
}
