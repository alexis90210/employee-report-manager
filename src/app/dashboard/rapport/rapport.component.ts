import { query } from '@angular/animations';
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
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss'],
})
export class RapportComponent implements OnInit {
  mobile: String = '';
  isActive: boolean = false;
  listRapport: Array<Rapport> = [];
  RapportToDay:any = {}
  auth:any;

  constructor(private route: Router) {
    this.auth = localForage.getItem('auth');

    console.log(this.auth);
    

    if (this.auth) {
      this.mobile = this.auth.Mobile;
      this.getToDayReport()
      this.getList();

    } else {
      this.route.navigate(['']);
    }
  }

  async getList() {
    const URL_RAPPORT = 'http://localhost:8000/api/v1/make/rapport';

    let data = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        allBy: true,
        IDEMP: this.auth.IDEMP,
        limit_data: true
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
      console.log('error ocurred');
      
    }
  }

  async getToDayReport() {
    const URL_RAPPORT = 'http://localhost:8000/api/v1/make/rapport';

    let data = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        allBy: true,
        IDEMP: this.auth.IDEMP,
        Date_creation: new Date().toLocaleDateString().toString()
      }),
    }).then((res) => res.json());

    if (data.code == 'success' && data.message.length > 0) {
      data.message.map((el: any, index: any) => {
        data.message[index].Date_creation = moment(
          data.message[index].Date_creation,
          'DD/MM/YYYY h:mm:ss a'
        )
          .locale('fr')
          .fromNow()
          .toString();
      });

      this.RapportToDay = data.message[0];
    } else {
      this.RapportToDay = {}
    }
  }


  ngOnInit(): void {}

  redirect(read: boolean, edit: boolean, id: any) {
    id = btoa(id)
    this.route.navigate(['/dashboard/' + '@'+this.mobile + '/rapport/manage'], {queryParams:{reference:id, read:read, edit:edit}});
  }

  detete(id: any) {
   
  }
}
