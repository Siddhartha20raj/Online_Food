import { Component, OnInit } from '@angular/core';
import { RazorpayService } from '../razorpay.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodBoxService } from '../food-box.service';
import { CartItem } from '../model-classes/cart-item.model';
import { User } from '../model-classes/user.model';
import { OrderDetails } from '../model-classes/order-details.model';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  isLoading: boolean = false;
  userId!: number;
  amount!: number;
  email!: string;
  contact!: string;
  name!: string;
  address!: string;
  city!: string;
  state!: string;
  zip!: string;
  cartItems: CartItem[] = [];
  paymentForm: FormGroup;
  emailInvalid: boolean = false;
  contactInvalid: boolean = false;
  totalCartCost: number = 0;
  alertMessage = '';
  user: User;
  order: OrderDetails;
  paymentIdForCod: string;
  message = '';

  regForm = this.builder.group({
    amount: this.builder.control(
      { value: this.amount, disabled: true },
      Validators.required
    ),
    email: this.builder.control({ value: this.email, disabled: true }, [
      Validators.required,
      Validators.email,
    ]),
    contact: this.builder.control(
      { value: this.contact, disabled: true },
      Validators.required
    ),
    name: this.builder.control(
      { value: this.name, disabled: true },
      Validators.required
    ),
    address: this.builder.control('', Validators.required),
    city: this.builder.control('', Validators.required),
    state: this.builder.control('', Validators.required),
    zip: this.builder.control('', Validators.required),
  });
  constructor(
    private razorpayService: RazorpayService,
    private http: HttpClient,
    private service: FoodBoxService,
    private router: Router,
    private route: ActivatedRoute,
    private builder: FormBuilder
  ) {
    this.paymentForm = this.builder.group({
      amount: [{ value: '', disabled: true }, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.razorpayService.loadScript().subscribe(() => {
      // Razorpay SDK loaded
    });
    this.email = this.route.snapshot.params[`email`];
    this.getUser();
    this.getCartItems();
    this.amount = this.cartItemsTotalCost();
  }
  getUser(): void {
    this.service.getUserByEmail("'" + this.email + "'").subscribe((user) => {
      this.user = user;
      this.email = user.email;
      this.userId = user.userId;
      this.contact = user.mobileNumber;
      this.name = user.name;
      this.getCartItems();
    });
  }

  getCartItems(): void {
    this.service.getCartItems(this.userId).subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.amount = this.cartItemsTotalCost();
    });
  }

  cartItemsTotalCost(): number {
    return this.cartItems.reduce(
      (total, cartItem) => total + cartItem.totalFoodItemCost,
      0
    );
  }

  makePayment() {
    const userId = this.userId;
    let paymentId = '';
    const paymentType = 'online';
    if (this.regForm.invalid) {
      console.log('Form is invalid. Cannot make payment.');
      this.message = 'Form is invalid. Cannot make payment.';
      return;
    }
    const options: any = {
      key: 'rzp_test_DxmERqiPxdWrbr',
      amount: this.amount * 100, // Amount in paisa
      name: 'Friendly Cafe',
      description: 'Payment for your order',
      handler: (response: any) => {
        console.log(response);
        paymentId = response.razorpay_payment_id;
        const orderDetails = {
          userId: userId,
          name: this.name,
          email: this.email,
          contact: this.contact,
          amount: this.amount,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
          paymentMethod: paymentType,
          paymentId: response.razorpay_payment_id,
          orderDate: new Date(),
        };

        this.service.createOrder(orderDetails).subscribe(
          (data: any) => {
            console.log('Order created:', data);
            this.service.deleteCart(userId).subscribe();
            this.router.navigate(['/order-summary', data.orderId]);
          },
          (error: any) => {
            console.error('Error creating order:', error);
          }
        );
        this.service
          .getOrderDetailsByPaymentId(paymentId)
          .subscribe((orderDetails) => (this.order = orderDetails));
      },
      prefill: {
        email: this.email,
        contact: this.contact,
        name: this.name,
      },
      notes: {
        address: 'Your Address',
      },
      theme: {
        color: '#6466e3',
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed');
        },
      },
    };

    const rzp = new Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
      console.log(
        'Payment failed:',
        response.error.code,
        response.error.description
      );
    });
    rzp.open();

    // Reset the amount after payment is made
    rzp.on('payment.success', (response: any) => {
      this.amount = 0; // Reset the amount to null
    });
  }

  payWithCash() {
    // Handle cash payment logic here
    this.isLoading = true; // Show the spinner
    this.service.getPaymentIdForCod().subscribe((id) => {
      this.paymentIdForCod = id;
      console.log(id);
    });
    if (this.regForm.invalid) {
      console.log('Form is invalid. Cannot make payment.');
      this.message = 'Form is invalid. Cannot make payment.';
      return;
    }
    setTimeout(() => {
      const userId = this.userId;
      const paymentType = 'cash';
      const orderDetails = {
        userId: userId,
        name: this.name,
        email: this.email,
        contact: this.contact,
        amount: this.amount,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        paymentId: this.paymentIdForCod,
        paymentMethod: paymentType,
        orderDate: new Date(),
      };

      this.service.createOrder(orderDetails).subscribe(
        (data: any) => {
          console.log('Order created:', data);
          this.service.deleteCart(userId).subscribe();
          this.router.navigate(['/order-summary', data.orderId]);
        },
        (error: any) => {
          console.error('Error creating order:', error);
        }
      );

      // Reset isLoading state after navigation
      setTimeout(() => {
        this.isLoading = false;
      }, 100); // A small delay to ensure smooth transition
    }, 100); // Wait for 0.1 seconds
  }

  validateEmail(email: string): void {
    this.emailInvalid = !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
      email
    );
  }

  validateContact(contact: string): void {
    this.contactInvalid = !/^\d{10}$/.test(contact);
  }

  get emailField() {
    return this.regForm.get('email');
  }

  get contactField() {
    return this.regForm.get('contact');
  }

  get nameField() {
    return this.regForm.get('name');
  }

  get addressField() {
    return this.regForm.get('address');
  }

  get cityField() {
    return this.regForm.get('city');
  }

  get stateField() {
    return this.regForm.get('state');
  }

  get zipField() {
    return this.regForm.get('zip');
  }
}
