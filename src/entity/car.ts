import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

@Entity()/*订单信息表*/
export class order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    goodsName: string;/*商品名*/

    @Column({type:"int"})
    quantity:string;/*商品数量*/

    @Column()/*商品*/
    goods:string;

    @Column()
    price:string;
}