import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
var localForage = require('localforage')

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  mobile: String = '';
  auth:any;
  constructor(private route: Router) {
    this.checkAuth()
  }

  async checkAuth() {
    this.auth = await localForage.getItem('auth');

    console.log(this.auth);
    

    if (this.auth) {
      this.mobile = this.auth.Mobile;
    } else {
      this.route.navigate(['']);
    }
  }

  ngOnInit(): void {}

  logout() {
    localForage.removeItem('preview') 
    localForage.removeItem('auth') 
    this.route.navigateByUrl('')
  }
}
