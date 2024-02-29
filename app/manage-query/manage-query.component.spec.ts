import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageQueryComponent } from './manage-query.component';

describe('ManageQueryComponent', () => {
  let component: ManageQueryComponent;
  let fixture: ComponentFixture<ManageQueryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageQueryComponent]
    });
    fixture = TestBed.createComponent(ManageQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
