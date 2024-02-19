import { ClassGlobal } from "src/class_global/class_global.entity";
import { Lot } from "src/lot/entities/lot.entity";
import { Sale } from "src/sale/entities/sale.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sale_lots_lot' })
export class SaleLot extends ClassGlobal {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Sale, (sale) => sale.saleLots)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => Lot, (lot) => lot.saleLots)
  @JoinColumn({ name: 'lot_id' })
  lot: Lot;

  @Column('float')
  price: number;

  @Column('integer')
  quantity: number;
}
