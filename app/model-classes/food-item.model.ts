import { Category } from "./category.model";

export class FoodItem {
    foodItemId!: number;
    name!: string;
    description!: string;
    actualPrice!:number;
    availableQuantity!: number;
    category!:Category;
    imagePath!:string;
    enabled!:boolean;
    offer!:number;
  }
