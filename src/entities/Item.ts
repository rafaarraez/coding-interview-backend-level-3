import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column({ type: "integer" })
    price: number;
}
