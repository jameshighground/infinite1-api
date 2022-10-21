import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, Unique} from "typeorm";
@Entity()
export default class Sample extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
