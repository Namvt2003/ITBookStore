export class Order {
    id!: number;
    booknames!: string[];
    customer_name!: string;
    address!: string;
    quantity!: number;
    totalprice!:number;
    checkedout!: boolean;
    done!: boolean;
    paymentmethod!: number;
    phonenumber!: string;
}
