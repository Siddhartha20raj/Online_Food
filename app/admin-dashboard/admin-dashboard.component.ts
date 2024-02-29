import { Component, OnInit } from '@angular/core';
import { FoodBoxService } from '../food-box.service';
import { Admin } from '../model-classes/admin.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  dashboardCards = [
    {
      image: 'assets/images/managecategory.jpg',
      alt: 'Image 1',
      routerLink: '/manage-categories',
      buttonText: 'Manage Categories',
    },
    {
      image: 'assets/images/order.jpg',
      alt: 'Image 2',
      routerLink: '/view-orders',
      buttonText: 'View Orders',
    },
    {
      image: 'assets/images/review.jpg',
      alt: 'Image 3',
      routerLink: '/view-reviews',
      buttonText: 'View Reviews',
    },
    {
      image: 'assets/images/query.jpg',
      alt: 'Image 4',
      routerLink: '/manage-queries',
      buttonText: 'View Queries',
    },
  ];

  admin: Admin = new Admin();
  message = '';
  adminEmployeeId = sessionStorage.getItem('adminSession');
  passwordForm: FormGroup;
  showPasswordForm = false;
  constructor(private service: FoodBoxService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.getAdmin();
    this.showPasswordForm = false;
  }
  getAdmin(): void {
    console.log(this.adminEmployeeId);

    this.service
      .getAdminByEmployeeId(this.adminEmployeeId)
      .subscribe((admin) => {
        this.admin = admin;

        this.passwordForm = this.fb.group(
          {
            email: [{ value: admin.email, disabled: true }],
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
      this.admin.password = newPassword;
      this.service.updateAdmin(this.admin).subscribe((response) => {
        alert(response);
        this.ngOnInit();
      });
    }
  }
}
