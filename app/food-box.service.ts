import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CartItem } from './model-classes/cart-item.model';
import { Observable, catchError, throwError } from 'rxjs';
import { FoodItem } from './model-classes/food-item.model';
import { Category } from './model-classes/category.model';
import { Admin } from './model-classes/admin.model';
import { User } from './model-classes/user.model';
import { OrderDetails } from './model-classes/order-details.model';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class FoodBoxService implements OnInit {
  private baseUrl = 'http://localhost:9002';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  getFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.baseUrl}/foodItems`);
  }
  getFoodItemsByCategory(categoryId: number): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.baseUrl}/foodItems/${categoryId}`);
  }
  addFoodItem(categoryId: number, newFoodItem: FoodItem) {
    return this.http.post(
      `${this.baseUrl}/foodItems/${categoryId}`,
      newFoodItem,
      { responseType: 'text' }
    );
  }
  editFoodItem(foodItem: FoodItem): Observable<string> {
    return this.http.put(`${this.baseUrl}/foodItems`, foodItem, {
      responseType: 'text',
    });
  }
  deleteFoodItem(foodItemId: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/foodItems/delete/${foodItemId}`, {
      responseType: 'text',
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category`);
  }
  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/category/${categoryId}`);
  }
  addCategory(categoryName: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}/category/add/${categoryName}`,
      null,
      { responseType: 'text' }
    );
  }
  deleteCategory(categoryId: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/category/delete/${categoryId}`, {
      responseType: 'text',
    });
  }

  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/cart/${userId}`);
  }

  addToCart(
    foodItemId: number,
    quantity: number,
    userId: number
  ): Observable<string> {
    console.log(foodItemId, quantity, userId);

    return this.http.post(
      `${this.baseUrl}/cart/add?userId=${userId}&foodItemId=${foodItemId}&quantity=${quantity}`,
      null,
      { responseType: 'text' }
    );
  }
  updateCartItemQuantity(
    cartItem: CartItem,
    newQuantity: number
  ): Observable<string> {
    console.log(cartItem.cartItemId, newQuantity);
    return this.http.put(
      `${this.baseUrl}/cart/update/${cartItem.cartItemId}/${newQuantity}`,
      null,
      { responseType: 'text' }
    );
  }

  removeFromCart(cartItem: CartItem): Observable<string> {
    return this.http.delete(
      `${this.baseUrl}/cart/deleteFromCartOnly/${cartItem.cartItemId}`,
      { responseType: 'text' }
    );
  }

  registerAdmin(admin: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/admin/register`, admin, {
      responseType: 'text',
    });
  }

  loginAdmin(adminCreds: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/admin/login`, adminCreds, {
      responseType: 'text',
    });
  }
  getAdminByEmployeeId(adminEmployeeId: string): Observable<Admin> {
    return this.http.get<Admin>(
      `${this.baseUrl}/admin/employeeId/${adminEmployeeId}`
    );
  }
  updateAdmin(admin: Admin): Observable<string> {
    return this.http.put(`${this.baseUrl}/admin/update`, admin, {
      responseType: 'text',
    });
  }

  registerUser(user: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/user/register`, user, {
      responseType: 'text',
    });
  }

  loginUser(userCreds: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/user/login`, userCreds, {
      responseType: 'text',
    });
  }
  getUserByEmail(userEmail: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/email/${userEmail}`);
  }
  updateUser(user: User): Observable<string> {
    return this.http.put(`${this.baseUrl}/user/update`, user, {
      responseType: 'text',
    });
  }

  createOrder(order: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/order/createOrder`, order, httpOptions)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.error('Error creating order:', error);
    return throwError(
      'An error occurred while creating the order. Please try again later.'
    );
  }
  getPaymentIdForCod(): Observable<string> {
    return this.http.get(`${this.baseUrl}/order/idForCod`, {
      responseType: 'text',
    });
  }
  getOrderDetailsByPaymentId(paymentId: string): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(
      `${this.baseUrl}/order/paymentId/${paymentId}`
    );
  }
  getOrderDetails(orderId: number): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(
      `${this.baseUrl}/order/orderId/${orderId}`
    );
  }
  deleteCart(userId: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/cart/deleteCart/${userId}`, {
      responseType: 'text',
    });
  }

  addReview(value: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/review`, value);
  }
  getReviews(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/review`);
  }
  submitContactForm(formData: any): Observable<string> {
    console.log(formData);

    return this.http.post(`${this.baseUrl}/contact-form`, formData, {
      responseType: 'text',
    });
  }
  getOrders(): Observable<OrderDetails[]> {
    return this.http.get<OrderDetails[]>(`${this.baseUrl}/order`);
  }
  getContactFormQueries(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/contact-form`);
  }
  removeQuery(queryId: number): Observable<string> {
    return this.http.delete(`${this.baseUrl}/contact-form/${queryId}`, {
      responseType: 'text',
    });
  }
}
