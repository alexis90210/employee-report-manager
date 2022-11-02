import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  email: String = '';
  constructor(private route: Router) {
    this.email = 'alexisng90210@gmail.com';
  }

  ngOnInit(): void {}

  logout() {
    this.route.navigateByUrl('')
  }
}
