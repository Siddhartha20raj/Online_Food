import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../model-classes/order-details.model';
import { FoodBoxService } from '../food-box.service';

@Component({
  selector: 'app-manage-query',
  templateUrl: './manage-query.component.html',
  styleUrls: ['./manage-query.component.css']
})
export class ManageQueryComponent implements OnInit{
  queries=[];
  currentPage = 1;
  itemsPerPage = 5; // Number of orders to display per page

  constructor(private service:FoodBoxService) { }

  ngOnInit(): void {
    this.getQueries();
  }

  getQueries(): void {
    this.service.getContactFormQueries().subscribe(queries => {
      this.queries = queries;
    });
  }
  removeQuery(queryId:number):void{
    this.service.removeQuery(queryId).subscribe(
      ()=>{
        this.getQueries();
      }
    )
  }
}