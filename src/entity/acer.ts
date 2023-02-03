import { Index, CreateDateColumn, UpdateDateColumn ,Column, Entity, JoinColumn, OneToMany, ManyToMany, PrimaryGeneratedColumn, JoinTable} from "typeorm";
import { UserCar } from "./userCar";
import { order } from "./order";
import {centerWork} from "./centerWork";

@Entity()/*用户信息表*/
export class Acer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    userPwd: string;

    @Column({type:("bigint"),name:'Num'})
    userNum: number;

    @Column({nullable:(true)})
    introdution: string ;

    @Column({default:('boy')})
    gander: string ;

    @Column({default:('public/upload/LOGO.png')})
    ImgUrl: string ;

    @Column({default:(' ')})
    session: string ;

    @OneToMany((type) => UserCar, (car) => car.car)
    @JoinColumn({ name: 'Carid' })
    user: UserCar[];

    @OneToMany((type) => order, (order) => order.order)
    @JoinColumn({ name: 'Orderid' })
    order: order[];

    // @OneToMany((type) => centerWork, (work) => work.WorkId)
    // @JoinColumn({ name: 'WorkId' })
    // work: centerWork[];
    // 无中间实体表的配置
    // @ManyToMany(type => centerWork, work => work.users)
    // @JoinTable({
    //     name: 'acer_work',
    //     joinColumns: [
    //         {name: 'userNum'}
    //     ],
    //     inverseJoinColumns: [
    //         {name: 'WorkId'}
    //     ]
    // })
        // 下面的定义也能实现
        //   @JoinTable({
        //     name: 'acer_work',
        //     joinColumn: { name: 'acer_Num' },
        //     inverseJoinColumn: { name: 'work_num' },
        //   })
    // work: centerWork[];
}
