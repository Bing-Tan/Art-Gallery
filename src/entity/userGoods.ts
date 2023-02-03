import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()/*商品信息表*/
export class userGoods {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    goodsName:string;/*商品名*/

    @Column()
    goods:string;/*商品图*/

    @Column()
    explain:string;/*商品说明*/

    @Column({default:1})
    quantity:string;/*商品数量*/

    @Column()
    price:number;/*商品价格*/

    @Column({type:"bigint"})
    sellerId:number;/*卖家名*/

}