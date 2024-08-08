import { Category } from './category.model';
export class Book {
    id!: number;
    title!: string;
    author!: string;
    price!: number;
    image_url!: string;
    rating!: number;
    description!: string;
    quantity!: number;
    soldout: number = 0;
    category!: Category;
}
