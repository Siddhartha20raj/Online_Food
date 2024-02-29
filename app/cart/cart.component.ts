import { Component, OnInit } from '@angular/core';
import { FoodBoxService } from '../food-box.service';
import { CartItem } from '../model-classes/cart-item.model';
import { User } from '../model-classes/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user: User = new User();
  userEmail = sessionStorage.getItem('userSession');
  cartItems: CartItem[] = [];
  totalCartCost: number = 0;
  alertMessage = '';
  showModal = false;
  constructor(private service: FoodBoxService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    console.log(this.userEmail);

    this.service.getUserByEmail(this.userEmail).subscribe(

      user => {
        this.user = user;
        console.log(this.user);
        this.getCartItems();
      }
    )
  }
  getCartItems(): void {
    this.service.getCartItems(this.user.userId).subscribe(cartItems => {
      this.cartItems = cartItems;
      this.calculateTotalCartCost();
    });
  }
  calculateTotalCartCost(): void {
    this.totalCartCost = this.cartItems.reduce(
      (total, cartItem) => total + cartItem.totalFoodItemCost,
      0
    );
  }
  updateQuantity(cartItem: CartItem, newQuantity: number, sign: string): void {
    if (cartItem.foodItem.availableQuantity >= 0) { // Check if available quantity is greater than 0
      if (sign == '-') {
        newQuantity--;
        if (newQuantity < 0) {
          this.openModal("Quantity can't be negative.");
          return;
        }
      }
      if (sign == '+') {
        newQuantity++;
        if (cartItem.foodItem.availableQuantity == 0) {
          this.openModal("Quantity exceeds available quantity.");
          return;
        }
      }
      this.service.updateCartItemQuantity(cartItem, newQuantity).subscribe(
        response => {
          console.log(response);
          setTimeout(() => {
            this.ngOnInit();
          }, 100);
        }
      );
    } else {
      this.openModal("Item is out of stock."); // Inform the user that item is out of stock
    }
  }

  removeFromCart(cartItem: CartItem): void {
    this.service.removeFromCart(cartItem).subscribe(
      (response) => {
        console.log(response);
        setTimeout(() => {
          this.ngOnInit();
        }, 100);
      }
    );
  }
  openModal(message: string): void {
    const modal = document.getElementById('alertModal');
    this.alertMessage = message;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.alertMessage='';

  }
  redirectToPayment(): void {
    console.log(this.user.email);
    
    this.router.navigate(['/payment', this.user.email]);
  }
}