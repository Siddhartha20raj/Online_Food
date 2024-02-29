import { Component, OnInit } from '@angular/core';
import { FoodBoxService } from '../food-box.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: FoodBoxService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }
  submitForm(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.service.submitContactForm(formData).subscribe(
        (response)=>{
          alert(response);
          this.ngOnInit();
        }
      )
    }
  }
}
