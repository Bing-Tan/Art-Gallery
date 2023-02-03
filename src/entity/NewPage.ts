import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()/*全部作品表*/
export class NewPage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    NewsName:string;/*新闻标题*/

    @Column()
    ImgUrl:string;/*图片路径*/

    @Column()
    Author:string;/*新闻作者*/

    @Column()
    Explain:string;/*新闻正文*/

    @Column()
    Text:string;/*新闻简介*/

    @Column()
    Date:string;/*新闻发布时间*/
}