import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
var localForage = require("localforage");

type apiResponse = {
  code?:String,
  message?: any,
  detail?:any
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mobile: String = '';
  password: String = '';
  isLoading: boolean = false;
  raiseErrorLogin: boolean = false;
  raiseSuccessLogin: boolean = false;

  constructor(  private route: Router ) {
   
  }

  ngOnInit(): void {}

  async login() {
    this.isLoading = true;

    if(this.mobile.length == 0) return;

    if(this.password.length == 0) return;   
    
    const URL_LOGIN = "http://localhost:8000/api/v1/make/employes"

    let data = await fetch(URL_LOGIN,{
      mode:'cors',
      method:'POST',
      body:JSON.stringify({
        auth:true,
        Mobile: this.mobile,
        Password:this.password
      })
    }).then( res => res.json())

    console.log(data);

    if(data.message.length > 0 ) {
      this.isLoading = false;
      this.raiseSuccessLogin = true
      localForage.setItem("auth", data.message[0])
      this.isLoading = true;
      setTimeout(() => {
        this.redirectToHome(data.message[0].Mobile)
      },3000)

    } else {
      this.isLoading = false;
      this.raiseErrorLogin = true
    setTimeout(() => {
      this.raiseErrorLogin = false
    },6000)
     
    }     
  }

  redirectToHome( Mobile : string) {
    
    this.route.navigate(['/dashboard', '@'+Mobile]);
  }
  
}

