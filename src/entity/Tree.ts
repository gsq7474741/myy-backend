import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"


@Entity()
export class Tree {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("uuid")
    owner_id: string

    @CreateDateColumn()
    create_date: Date

    @UpdateDateColumn()
    update_date: Date

}
