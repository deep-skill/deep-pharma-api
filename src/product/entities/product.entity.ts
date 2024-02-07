import { Brand } from "src/brand/entities/brand.entity";
import { Drug } from "src/drug/entities/drug.entity";
import { Laboratory } from "src/laboratory/entities/laboratory.entity";
import { Presentation } from "src/presentation/entities/presentation.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    drug?: Drug

    @ManyToOne(() => Laboratory , laboratory => laboratory.products)
    laboratory?: Laboratory

    @ManyToOne(() => Presentation , presentation => presentation.products)
    presentation?: Presentation

    @ManyToOne(() => Brand , presentation => presentation.products)
    brand?: Brand
}
