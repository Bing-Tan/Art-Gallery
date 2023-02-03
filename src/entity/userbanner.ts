import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()/*用户作品表*/
export class userBanner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    worksName:string;

    @Column()
    ImgUrl:string;/*作品图片*/

    @Column()
    Author:string;

    @Column()
    Explain:string;
}