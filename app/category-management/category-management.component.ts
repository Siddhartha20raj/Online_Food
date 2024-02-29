import { Component, OnInit } from '@angular/core';
import { FoodBoxService } from '../food-box.service';
import { Router } from '@angular/router';
import { Category } from '../model-classes/category.model';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit{
  categories: Category[]=[];
  newCategoryName='';
  constructor(private service:FoodBoxService, private router:Router){}

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories():void{
    this.service.getCategories().subscribe(
      categories=>{
        this.categories=categories;
        console.log(categories);
        
      }
    )
  }
  addCategory(newCategoryName:string):void{
    this.service.addCategory(newCategoryName).subscribe(
      response=>{
        if(response=='0'){
          alert("Category already exists!");
        }
      else{
        this.ngOnInit();
      }
      }
    )
  }
  deleteCategory(categoryId:number):void{
    this.service.deleteCategory(categoryId).subscribe(
      response=>{
        this.ngOnInit();
        }
    )
  }
  manageFoodItems(categoryId:number):void{
    this.router.navigate(['/category', categoryId, 'food-items']);
  }
}
