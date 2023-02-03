import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()/*商品信息表*/
export class Goods {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    goodsName:string;/*商品名*/

    @Column()
    goods:string;/*商品图*/

    @Column()
    explain:string;/*商品说明*/

    @Column({type:"bigint"})
    quantity:string;/*商品数量*/

    @Column()
    price:number;/*商品价格*/

    @Column()
    seller:string;/*卖家名*/

}