import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
var moment = require('moment');
var localForage = require('localforage');

type Rapport = {
  IDRAPPORT?: String;
  Titre?: String;
  Commentaire?: String;
  Fichier?: String;
  Date_creation?: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  mobile: String = '';
  isActive: boolean = false;
  auth: any;
  listRapport: Array<Rapport> = [];

  constructor(private route: Router) {
    this.auth = localForage.getItem('auth');

    if (this.auth) {
      this.mobile = this.auth.Mobile;
      this.getList();
    } else {
      this.route.navigate(['']);
    }
  }

  async getList() {
    const URL_RAPPORT = 'http://localhost:8000/api/v1/make/employes';

    let data = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        allBy: true,
        IDEMP: this.auth.IDEMP,
        limit: true,
      }),
    }).then((res) => res.json());

    if (data.code == 'success') {
      data.message.map((el: any, index: any) => {
        data.message[index].Date_creation = moment(
          data.message[index].Date_creation,
          'DD/MM/YYYY h:mm:ss a'
        )
          .locale('fr')
          .fromNow()
          .toString();
      });

      this.listRapport = data.message;
    } else {
    }
  }

  ngOnInit(): void {}

  redirect(read: boolean, edit: boolean, id: any) {
    id = btoa(id);
    this.route.navigate(['/dashboard/' + this.mobile + '/rapport/manage'], {
      queryParams: { reference: id, read: read, edit: edit },
    });
  }

  detete(id: any) {}
}
