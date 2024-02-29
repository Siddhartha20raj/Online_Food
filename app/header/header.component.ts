import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router:Router){}
    adminSession:string;
    userSession:string;
    ngOnInit(): void {
      this.adminSession=sessionStorage.getItem("adminSession");
      this.userSession=sessionStorage.getItem("userSession");
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.adminSession=sessionStorage.getItem("adminSession");
          this.userSession=sessionStorage.getItem("userSession");
        }
      });
    }
    adminLogout():void{
      sessionStorage.removeItem("adminSession");
      this.router.navigate(['/admin-login-register'])
    }
    userLogout():void{
      sessionStorage.removeItem("userSession");
      this.router.navigate(['/user-login-register'])
    }
}
