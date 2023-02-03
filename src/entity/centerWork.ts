import {Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Acer} from "./acer";
import {JoinTable} from "typeorm/browser";

@Entity()/*用户中心我的作品表*/
export class centerWork {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    worksName:string;//作品名称

    @Column()
    ImgUrl:string;/*图片路径*/

    @Column()
    kind:string;//画种

    @Column()
    Explain:string;//说明

    @Column()
    date:string;// 日期

    @Column()
    time:string;// 时间

    @Column()
    WorkId:string;//用户ID

    // 无中间实体表的配置
    // @ManyToMany(type => Acer, user => user.userNum, { cascade: true })
    // users: Acer[];
    // @ManyToOne((type) => Acer,(acer) => acer.userNum)
    // @JoinColumn({ name: 'userNum' })
    // acer: Acer;
}