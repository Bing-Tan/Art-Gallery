import {Column,Entity,PrimaryGeneratedColumn} from "typeorm";


@Entity()/*评论信息表*/
export class comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    WorkId:number;/*帖子id*/

    @Column({type:"bigint"})
    UserNum:number;/*发送人账号*/

    @Column({type:"bigint"})
    IsUserNum:number;/*帖子主人账号*/

    @Column()
    contain:string;/*评论内容*/

    @Column()
    date:string;/*发送日期*/

    @Column()
    time:string;/*发送时间*/

}