import {Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn} from "typeorm";
import { Acer } from "./acer";

@Entity()/*用户购物车信息表*/
export class UserCar {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"bigint"})
    Carid:number;/*购物车id*/

    @Column()
    goodsName:string;/*商品名*/

    @Column()
    goods:string;/*商品图*/

    @Column()
    explain:string;/*商品说明*/

    @Column({type:"int",default:('1')})
    quantity:string;/*商品数量*/

    @Column()
    price:number;/*商品价格*/

    @Column()
    seller:string;/*卖家名*/

    @ManyToOne((type) => Acer, (user) => user.user)
    @JoinColumn({ name: 'userNum' })
    car: Acer;
}