import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,Validators } from '@angular/forms';
import { FoodBoxService } from '../food-box.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  constructor(private service: FoodBoxService,private rev:FormBuilder){}
    addReviewItem=this.rev.group({
      'reviewName':new FormControl('',[Validators.required]),
      'reviewComment':new FormControl('',[Validators.required]),
      'reviewStar':new FormControl('',[Validators.required])

    });

    getArray(count: number): any[] {
      return new Array(count);
    }
    message: any;
    public submitReview(){
      console.log(this.addReviewItem.value);
      let response = this.service.addReview(this.addReviewItem.value);
      response.subscribe((data: any) => {this.message = data
        this.addReviewItem.reset();
        this.ngOnInit();
      });
      
      
    }

  reviewlist:any;
  ngOnInit(): void {
    let response=this.service.getReviews();
    response.subscribe((data:any)=>this.reviewlist=data);
  }

}
