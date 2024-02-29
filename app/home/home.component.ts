import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adminSession:string;
  userSession:string;
  ngOnInit(): void {
    this.adminSession=sessionStorage.getItem("adminSession");
    this.userSession=sessionStorage.getItem("userSession");
  }
}
