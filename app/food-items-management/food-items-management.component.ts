import { Component, Input, OnInit } from '@angular/core';
import { FoodBoxService } from '../food-box.service';
import { FoodItem } from '../model-classes/food-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../model-classes/category.model';
@Component({
  selector: 'app-food-items-management',
  templateUrl: './food-items-management.component.html',
  styleUrls: ['./food-items-management.component.css'],
})
export class FoodItemsManagementComponent implements OnInit {
  showList = true;
  showAdd = false;
  showEdit = false;
  newFoodItem: FoodItem = new FoodItem();
  foodItems: FoodItem[] = [];
  selectedCategory!: Category;
  categoryId!: number;
  constructor(
    private service: FoodBoxService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.showList = true;
    this.showEdit = false;
    this.showAdd = false;
    this.newFoodItem = new FoodItem();
    this.categoryId = this.route.snapshot.params[`categoryId`];
    this.getCategory();
    this.loadFoodItems(this.categoryId);
  }
  enableAdd(): void {
    this.showList = false;
    this.showAdd = true;
    this.showEdit = false;
  }
  enableEdit(foodItem: FoodItem): void {
    this.showList = false;
    this.showAdd = false;
    this.showEdit = true;
    this.newFoodItem = { ...foodItem };
  }
  loadFoodItems(categoryId: number): void {
    this.service.getFoodItemsByCategory(categoryId).subscribe((foodItems) => {
      this.foodItems = foodItems;
    });
  }
  getCategory(): void {
    this.service
      .getCategoryById(this.categoryId)
      .subscribe((category) => (this.selectedCategory = category));
  }
  editFoodItem(foodItem: FoodItem) {
    this.service.editFoodItem(foodItem).subscribe(() => {
      this.showList = true;
      this.showEdit = false;
      this.showAdd = false;
      this.newFoodItem = new FoodItem();
      this.loadFoodItems(this.categoryId);
    });
  }

  toggleFoodItemStatus(foodItem: FoodItem): void {
    foodItem.enabled = !foodItem.enabled;
    this.service.editFoodItem(foodItem).subscribe(() => {
      this.loadFoodItems(this.categoryId);
    });
  }

  deleteFoodItem(foodItemId: number) {
    this.service.deleteFoodItem(foodItemId).subscribe(() => {
      this.showList = true;
      this.showEdit = false;
      this.showAdd = false;
      this.newFoodItem = new FoodItem();
      this.loadFoodItems(this.categoryId);
    });
  }
  addFoodItem(foodItem: FoodItem): void {
    if (!foodItem.name) {
      alert('Please enter valid details before adding.');
      return; // Prevent further execution
    }
    console.log(foodItem);
    
    this.service.addFoodItem(this.categoryId, foodItem).subscribe((message) => {
      if (message == '0') alert('Food item already exists!');
      else {
        this.showList = true;
        this.showEdit = false;
        this.showAdd = false;
        this.newFoodItem = new FoodItem();
        this.loadFoodItems(this.categoryId);
      }
    });
  }
}
