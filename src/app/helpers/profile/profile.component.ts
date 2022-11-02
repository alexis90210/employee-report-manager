import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  email: String = ""
  isActive:boolean = false

  constructor( private route: Router ) {
    this.email = "alexisng90210@gmail.com"
  }

  ngOnInit(): void {
  }

  toggleProfileDropdownButton(){
    this.isActive = !this.isActive
  }

}
