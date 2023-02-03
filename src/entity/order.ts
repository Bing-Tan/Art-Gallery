import {Column,Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Acer } from "./acer";

@Entity()/*订单信息表*/
export class order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"bigint"})
    Orderid:number;/*订单账号id*/

    @Column()
    goodsName:string;/*商品名*/

    @Column()
    goods:string;/*商品图*/

    @Column()
    explain:string;/*商品说明*/

    @Column({type:"int"})
    quantity:string = '1';/*商品数量*/

    @Column()
    price:number;/*商品价格*/

    @Column()
    seller:string;/*卖家名*/

    @Column({default:(' ')})
    number: string ;/*订单号*/

    @Column({default:(' ')})
    date: string ;/*订单号*/

    @ManyToOne((type) => Acer, (user) => user.order)
    @JoinColumn({ name: 'userNum' })
    order: Acer;

}