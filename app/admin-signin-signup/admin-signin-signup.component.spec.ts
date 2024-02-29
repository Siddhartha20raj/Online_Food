import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSigninSignupComponent } from './admin-signin-signup.component';

describe('AdminSigninSignupComponent', () => {
  let component: AdminSigninSignupComponent;
  let fixture: ComponentFixture<AdminSigninSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSigninSignupComponent]
    });
    fixture = TestBed.createComponent(AdminSigninSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
