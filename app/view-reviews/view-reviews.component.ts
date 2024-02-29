import { Component, OnInit } from '@angular/core';
import { FoodBoxService } from '../food-box.service';
import { OrderDetails } from '../model-classes/order-details.model';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.css']
})
export class ViewReviewsComponent implements OnInit{
  reviews=[]
  currentPage = 1;
  itemsPerPage = 5; // Number of orders to display per page

  constructor(private service:FoodBoxService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.service.getReviews().subscribe(reviews => {
      this.reviews = reviews;
    });
  }
}