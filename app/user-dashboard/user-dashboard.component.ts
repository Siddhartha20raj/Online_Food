import { Component, OnInit } from '@angular/core';
import { User } from '../model-classes/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodBoxService } from '../food-box.service';
@Component({
 selector: 'app-user-dashboard',
 templateUrl: './user-dashboard.component.html',
 styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
 dashboardCards = [
 {
 image: 'assets/images/managecategories.jpg',
 alt: 'Image 1',
 routerLink: '/foodlist',
 buttonText: 'View Food Items',
 },
 {
 image: 'assets/images/carts.jpg',
 alt: 'Image 2',
 routerLink: '/cart',
 buttonText: 'Manage Cart',
 },
 {
 image: 'assets/images/reviews.jpg',
 alt: 'Image 3',
 routerLink: '/review',
 buttonText: 'Add Review',
 },
 ];
 user: User = new User();
 message = '';
 userEmail = sessionStorage.getItem('userSession');
 passwordForm: FormGroup;
 showPasswordForm = false;
 constructor(private service: FoodBoxService, private fb: FormBuilder) {}
 ngOnInit(): void {
 this.getUser();
 this.showPasswordForm = false;
 }
 getUser(): void {
 this.service.getUserByEmail(this.userEmail).subscribe((user) => {
 this.user = user;
 this.passwordForm = this.fb.group(
 {
 email: [{ value: user.email, disabled: true }],
 password: [
 '',
 [
 Validators.required,
 Validators.minLength(6),
 Validators.pattern(
 
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
 ),
 ],
 ],
 confirmPassword: ['', Validators.required],
 },
 { validators: this.passwordMatchValidator }
 );
 });
 }
 passwordMatchValidator(formGroup: FormGroup) {
 const password = formGroup.get('password').value;
 const confirmPassword = formGroup.get('confirmPassword').value;
 if (password !== confirmPassword) {
 formGroup.get('confirmPassword').setErrors({ passwordMismatch: true });
 } else {
 formGroup.get('confirmPassword').setErrors(null);
 }
 }
 onSubmit(): void {
 if (this.passwordForm.valid) {
 const newPassword = this.passwordForm.get('password').value;
 this.user.password = newPassword;
 this.service.updateUser(this.user).subscribe((response) => {
 alert(response);
 this.ngOnInit();
 });
 }
 }
}