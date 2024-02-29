import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor() { }
  loadScript(): Observable<void> {
    return new Observable<void>(observer => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        observer.next();
        observer.complete();
      };
      document.body.appendChild(script);
    });
  }
}
