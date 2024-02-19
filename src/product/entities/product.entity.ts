import { Brand } from "src/brand/entities/brand.entity";
import { Category } from "src/category/entities/category.entity";
import { ClassGlobal } from "src/class_global/class_global.entity";
import { Drug } from "src/drug/entities/drug.entity";
import { Lot } from "src/lot/entities/lot.entity";
import { Presentation } from "src/presentation/entities/presentation.entity";
import { PriceProductRecommended } from "src/price_product_recommended/entities/price_product_recommended.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product extends ClassGlobal {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    description: string;
    
    @Column('boolean')
    prescription_required: boolean;


    @Column('boolean')
    is_fractionable: boolean;

    @OneToOne(() => PriceProductRecommended)
    @JoinColumn({ name: 'price_id' })
    price: PriceProductRecommended

    @ManyToOne(() => Drug, { nullable: true })
    @JoinColumn({ name: 'drug_id' })
    drug?: Drug | null;

    @ManyToOne(() => Presentation, { nullable: true })
    @JoinColumn({ name: 'presentation_id' })
    presentation?: Presentation | null;

    @ManyToOne(() => Brand , presentation => presentation.products)
    @JoinColumn({ name: 'brand_id' })
    brand?: Brand

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category

    @OneToMany(() => Lot, lot => lot.product)
    lots: Lot[]
}
