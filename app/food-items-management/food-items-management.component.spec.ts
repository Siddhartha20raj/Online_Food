import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodItemsManagementComponent } from './food-items-management.component';

describe('FoodItemsManagementComponent', () => {
  let component: FoodItemsManagementComponent;
  let fixture: ComponentFixture<FoodItemsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FoodItemsManagementComponent]
    });
    fixture = TestBed.createComponent(FoodItemsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
