import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class ClassGlobal {
    @Column({ type: 'int', nullable: true })
    created_by: number;

    @Column({ type: 'int', nullable: true })
    updated_by: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}