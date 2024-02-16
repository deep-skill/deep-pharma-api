import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Brand {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    name: string;

    @OneToMany(() => Product, product => product.drug)
    products: Product[]

    @Column({ type: 'int', nullable: true })
    created_by: number;

    @Column({ type: 'int', nullable: true })
    updated_by: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
