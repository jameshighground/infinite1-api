import {Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import PrayAmen from "./PrayAmen";
@Entity()
export default class PrayArticle extends BaseEntity {
  @PrimaryGeneratedColumn({type: "bigint"})
  id: number;

  @Column({default: 0})
  refid: number;

  @Column()
  userid: string;

  @Column({type: "decimal", precision: 13, scale: 10})
  lat: number;

  @Column({type: "decimal", precision: 13, scale: 10})
  lng: number;

  @Column({type: "decimal", precision: 13, scale: 10})
  real_lat: number;

  @Column({type: "decimal", precision: 13, scale: 10})
  real_lng: number;

  @Column()
  content: string;

  @OneToMany(() => PrayAmen, amen => amen.article)
  amen: PrayAmen;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
