import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FoodBoxService } from '../food-box.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const value = control.value;
  const hasUpper = /[A-Z]/.test(value);
  const hasLower = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);

  if (hasUpper && hasLower && hasNumber && hasSpecial) {
    return null;
  } else {
    return { invalidPassword: true };
  }
}

@Component({
  selector: 'app-user-signin-signup',
  templateUrl: './user-signin-signup.component.html',
  styleUrls: ['./user-signin-signup.component.css'],
})
export class UserSigninSignupComponent {
  successMessage = '';
  errorMessage = '';

  constructor(
    private service: FoodBoxService,
    private fb: FormBuilder,
    private renderer: Renderer2,
    private router: Router
  ) {}

  login = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  addUser = this.fb.group({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z ]*$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordValidator,
    ]),
    mobileNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  message: any;
  email: any;

  public userLogin() {
    let response = this.service.loginUser(this.login.value);
    response.subscribe((data: any) => {
      this.message = data;

      if (this.message !== 'invalid') {
        sessionStorage.setItem('userSession', JSON.stringify(this.message));
        this.router.navigate(['/user-dashboard']);
      } else {
        this.errorMessage = 'Password or Email is incorrect!';
        // Display error message or alert for wrong credentials
        this.showErrorMessage(
          'Invalid Credentials',
          'Please enter valid email and password.'
        );
      }
    });
  }

  private showErrorMessage(title: string, message: string): void {
    // Display error message or alert box
    alert(`${title}\n\n${message}`);
    // You can also set the error message to be displayed on the UI
    // this.errorMessage = message;
  }

  public registerUser() {
    console.log(this.addUser.value);

    this.service.registerUser(this.addUser.value).subscribe((response) => {
      if (response == 'Registered Successfully! Login to continue') {
        this.successMessage = response;
        this.errorMessage = '';
      } else {
        this.successMessage = '';
        this.errorMessage = response;
      }
    });
  }

  @ViewChild('signinForm') signinForm: ElementRef;
  @ViewChild('signupForm') signupForm: ElementRef;
  @ViewChild('toSigninButton') toSigninButton: ElementRef;
  @ViewChild('toSignupButton') toSignupButton: ElementRef;

  showSignInForm() {
    this.successMessage = '';
    this.errorMessage = '';
    this.renderer.addClass(
      this.toSigninButton.nativeElement,
      'top-active-button'
    );
    this.renderer.removeClass(
      this.toSignupButton.nativeElement,
      'top-active-button'
    );

    this.renderer.setStyle(this.signupForm.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.signinForm.nativeElement, 'display', 'block');
  }

  showSignUpForm() {
    this.successMessage = '';
    this.errorMessage = '';
    this.renderer.addClass(
      this.toSignupButton.nativeElement,
      'top-active-button'
    );
    this.renderer.removeClass(
      this.toSigninButton.nativeElement,
      'top-active-button'
    );

    this.renderer.setStyle(this.signinForm.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.signupForm.nativeElement, 'display', 'block');
  }
}
