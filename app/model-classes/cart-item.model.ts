import { FoodItem } from "./food-item.model";

export class CartItem {
    cartItemId!: number;
    foodItem!: FoodItem;
    userId!: number;
    quantity!: number;
    totalFoodItemCost!: number;
  }
  