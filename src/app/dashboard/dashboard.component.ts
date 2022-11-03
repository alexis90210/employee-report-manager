import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'rxjs';
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
  month_1: any = {
    total: 0
  };
  month_2: any = {
    total: 0
  };
  month_3: any = {
    total: 0
  };
  month_current: any = {
    total: 0
  };

  lib:string = ""
  lib1:string = ""
  lib2:string = ""
  lib3:string = ""


  constructor(private route: Router) {
    this.checkAuth();
  }



  monthString(id: number): any {
    if (id == 1) return 'Janvier';
    if (id == 2) return 'Fevrier';
    if (id == 3) return 'Mars';
    if (id == 4) return 'Avril';
    if (id == 5) return 'Mai';
    if (id == 6) return 'Juin';
    if (id == 7) return 'Juillet';
    if (id == 8) return 'Aout';
    if (id == 9) return 'Septembre';
    if (id == 10) return 'Octobre';
    if (id == 11) return 'Novembre';
    if (id == 12) return 'Decembre';

    return '';
  }

  async loadStats() {
    // CURRENT  MONTH / YEAR
    let currentMonth = new Date().getMonth()+1;
    let currentYear = new Date().getFullYear();

    // MONTH -1
    let month_1 = new Date().getMonth() - 1;

    //  MONTH -2
    let month_2 = new Date().getMonth() - 2;

    //  MONTH -3
    let month_3 = new Date().getMonth() - 3;

    // DATE CURRENT

    let dateCombCurrent = currentMonth + '/' + currentYear;
    let dateCombCurrent_1 = month_1 + '/' + currentYear;
    let dateCombCurrent_2 = month_2 + '/' + currentYear;
    let dateCombCurrent_3 = month_3 + '/' + currentYear;

    const URL_RAPPORT = 'http://localhost:8000/api/v1/make/rapport';

    let payload: any;

    // --------------------- current -----------------------------

    payload = {
      allBy: true,
      IDEMP: this.auth.IDEMP,
      Date_creation: dateCombCurrent,
    };

    console.log(JSON.stringify(payload));

    let data_current = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    if (data_current.code == 'success')
      this.month_current.total = data_current.message.length;
    if (data_current.code == 'success')
      this.lib = this.monthString(currentMonth) ;

    // --------------------- 1 -----------------------------

    payload = {
      allBy: true,
      IDEMP: this.auth.IDEMP,
      Date_creation: dateCombCurrent_1,
    };

    console.log(JSON.stringify(payload));

    let data_1 = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    if (data_1.code == 'success') this.month_1.total = data_1.message.length;
    if (data_1.code == 'success')
      this.lib1 = this.monthString(month_1) as string;

    // --------------------- 2 -----------------------------

    payload = {
      allBy: true,
      IDEMP: this.auth.IDEMP,
      Date_creation: dateCombCurrent_2,
    };

    console.log(JSON.stringify(payload));

    let data_2 = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    if (data_2.code == 'success') this.month_2.total = data_2.message.length;
    if (data_2.code == 'success')
      this.lib2 = this.monthString(month_2);

    // --------------------- 3 -----------------------------

    payload = {
      allBy: true,
      IDEMP: this.auth.IDEMP,
      Date_creation: dateCombCurrent_3,
    };

    console.log(JSON.stringify(payload));

    let data_3 = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    if (data_3.code == 'success') this.month_3.total = data_3.message.length;
    if (data_3.code == 'success')
      this.lib3 = this.monthString(month_3);
  }

  async checkAuth() {
    this.auth = await localForage.getItem('auth');
    console.log(this.auth);

    if (this.auth) {
      this.mobile = this.auth.Mobile;
      this.getList();
      this.loadStats()
    } else {
      this.route.navigate(['']);
    }
  }

  async getList() {
    const URL_RAPPORT = 'http://localhost:8000/api/v1/make/rapport';

    let payload = {
      allBy: true,
      IDEMP: this.auth.IDEMP,
      limit_data: true,
    };

    console.log(JSON.stringify(payload));

    let data = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(payload),
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
      console.log(data.message);
    }
  }

  ngOnInit(): void {}

  redirect(read: boolean, edit: boolean, id: any) {
    localForage.setItem('preview', {
      read: read,
      edit: edit,
      id: id,
    });
    id = btoa(id);
    this.route.navigate(
      ['/dashboard/' + '@' + this.mobile + '/rapport/manage'],
      {
        queryParams: { reference: id, read: read, edit: edit },
      }
    );
  }

  async detete(id: any) {
    const URL_RAPPORT = 'http://localhost:8000/api/v1/make/rapport';

    let body = JSON.stringify({
      delete: true,
      IDRAPPORT: id,
    });

    console.log(body);

    let data = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: body,
    }).then((res) => res.json());

    this.getList();
  }
}
