import { Component, OnInit } from '@angular/core';
import { FoodBoxService } from '../food-box.service';
import { FoodItem } from '../model-classes/food-item.model';
import { Category } from '../model-classes/category.model';
import { User } from '../model-classes/user.model';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  user:User=new User();
  userEmail=sessionStorage.getItem('userSession');
  constructor(private service: FoodBoxService) { }
  foodItems: FoodItem[] = [];
  quantities: number[] = [];
  filteredFoodItems: FoodItem[] = [];
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  searchQuery = '';
  selectedSortOption: string = 'default';
  alertMessage='';
  ngOnInit(): void {
    this.getUser();
    this.getCategories();
    this.getFoodItems();
  }
  getUser(): void {
    console.log(this.userEmail);

    this.service.getUserByEmail(this.userEmail).subscribe(

      user => {
        this.user = user;
        console.log(this.user);
      }
    )
  }
  getCategories() {
    this.service.getCategories().subscribe(categories => {
      this.categories = categories;

    });
  }

  getFoodItems(): void {
    this.service.getFoodItems().subscribe(foodItems => {
      this.foodItems = foodItems;
      this.filteredFoodItems = foodItems;
      this.initializeQuantities();
    });
  }
  
  initializeQuantities(): void {
    this.quantities = new Array(this.foodItems.length).fill(1);
  }
  addToCart(foodItem: FoodItem, quantity: number): void {
    if (quantity <= 0) {
      this.showAlertModal('Please select a valid quantity');
    }
    else if (quantity <= foodItem.availableQuantity) {
      this.service.addToCart(foodItem.foodItemId, quantity,this.user.userId).subscribe(
        () => {
          console.log(foodItem.foodItemId,quantity);          
          foodItem.availableQuantity=foodItem.availableQuantity-quantity;
          this.service.editFoodItem(foodItem).subscribe(
            ()=>{
              this.getFoodItems();
            }
          )
          this.getFoodItems();
          this.showSuccessModal();
        }
      );


    } else {
      this.showAlertModal('Quantity exceeds available quantity');
    }
  }
  showSuccessModal(): void {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  closeSuccessModal(): void {
    const modal = document.getElementById('successModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  showAlertModal(message:string): void {
    const modal = document.getElementById('alertModal');
    this.alertMessage=message;
    if (modal) {
      modal.style.display = 'block';
    }
  }
  closeAlertModal(): void {
    const modal = document.getElementById('alertModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  increaseQuantity(i: number): void {
    this.quantities[i]++;
  }

  decreaseQuantity(i: number): void {
    this.quantities[i]--;
  }
  filterByCategory(category: Category | null): void {
    this.selectedCategory = category;
    if (category) {
      this.filteredFoodItems = this.foodItems.filter(
        foodItem => foodItem.category.categoryId === category.categoryId
        
      );
    } else {
      this.filteredFoodItems = this.foodItems;
    }
  }
  applyFilters(): void {
    this.filterByCategory(this.selectedCategory);
    this.filteredFoodItems = this.filteredFoodItems.filter(item =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    if (this.selectedSortOption === 'lowToHigh') {
      this.filteredFoodItems.sort((a, b) => a.actualPrice*(1-a.offer/100) - b.actualPrice*(1-b.offer/100));
    } else if (this.selectedSortOption === 'highToLow') {
      this.filteredFoodItems.sort((a, b) =>  b.actualPrice*(1-b.offer/100) -a.actualPrice*(1-a.offer/100));
    }

    if (this.searchQuery) {
      this.filteredFoodItems = this.filteredFoodItems.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
  

}
