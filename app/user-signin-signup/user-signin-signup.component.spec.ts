import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSigninSignupComponent } from './user-signin-signup.component';

describe('UserSigninSignupComponent', () => {
  let component: UserSigninSignupComponent;
  let fixture: ComponentFixture<UserSigninSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSigninSignupComponent]
    });
    fixture = TestBed.createComponent(UserSigninSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
