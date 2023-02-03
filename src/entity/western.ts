import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()/*全部作品表*/
export class western {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    worksName:string;

    @Column()
    ImgUrl:string;/*图片路径*/

    @Column()
    Author:string;

    @Column()
    Explain:string;
}