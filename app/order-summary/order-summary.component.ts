import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FoodBoxService } from '../food-box.service';
import { OrderDetails } from '../model-classes/order-details.model';
import { User } from '../model-classes/user.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  orderId:number;
  user:User;
  orderDetails: OrderDetails;

  constructor(private route: ActivatedRoute,private service:FoodBoxService) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params[`orderId`];
    this.getOrderDetails();
    this.getUser();
  }
  getOrderDetails():void{
    this.service.getOrderDetails(this.orderId).subscribe(
      orderDetails=>{
        this.orderDetails=orderDetails
      }
    )
  }
  deleteCart():void{
    this.service.deleteCart(this.orderDetails.userId).subscribe();
  }
  getUser():void{
    this.service.getUserByEmail(sessionStorage.getItem('userSession')).subscribe(
      (user)=>{
        this.user=user;
        this.deleteCart();
      }
    )
  }
}