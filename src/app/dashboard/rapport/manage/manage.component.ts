import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
var localForage = require('localforage');
type RouteQuery = {
  edit?: string;
  read?: string;
  reference?: string;
};

type RouteParam = {
  params?: RouteQuery;
};

type Rapport = {
  Titre?: string;
  Commentaire?: string;
};

type FullRapportFormat = {
  IDRAPPORT?: String;
  Titre?: String;
  Commentaire?: String;
  Fichier?: String;
  Date_creation?: any;
};

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
  mobile?: String;
  date: String = new Date().toLocaleString();
  routeParams?: RouteParam;
  paramatersQuery?: RouteQuery;
  edit: boolean = false;
  read: boolean  = false;
  reference: String = "";
  rapport: Rapport ={};
  auth:any;
  myRapport?: File ;
  myRapportName:String = "";

  currentRapport: FullRapportFormat = {};

  constructor(private route: Router, private activeRoute: ActivatedRoute) {
    this.auth = localForage.getItem('auth');

    if (this.auth) {
      this.mobile = this.auth.Mobile;

    } else {
      this.route.navigate(['']);
    }
    setInterval(() => {
      this.date = new Date().toLocaleString();
    }, 1000);

    activeRoute.queryParamMap.subscribe((params) => {

      this.routeParams = { ...params } as RouteParam;

      this.paramatersQuery = this.routeParams.params as RouteQuery
    
      this.edit = Boolean(this.paramatersQuery.edit);
  
      this.read = Boolean(this.paramatersQuery.read);
  
      this.reference = atob(this.paramatersQuery.reference as string);


      this.currentRapport = {
        IDRAPPORT: "1",
        Titre: "Lorem Ipsum has been the industry",
        Commentaire: "It has survived not only five centuries, but also the leap into electronic typesetting",
        Date_creation: new Date().toLocaleString()
      }


      this.rapport.Titre = this.currentRapport.Titre as string
      this.rapport.Commentaire = this.currentRapport.Commentaire as string


    });
  }

  async getOneRapport() {
    const URL_RAPPORT = 'http://localhost:8000/api/v1/make/rapport';

    let data = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        allBy: true,
        IDEMP: this.auth.IDEMP,
        IDRAPPORT: 1
      }),
    }).then((res) => res.json());
  }

  ngOnInit(): void { }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];

    if (file) {    
        this.myRapport = file;
        this.myRapportName = file.name
    }
  }


  async submitRapport() {

    console.log( this.myRapport );
    console.log( this.rapport )

    const URL_RAPPORT = 'http://localhost:8000/api/v1/make/rapport';

    let data = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        create: true,
        IDEMP: this.auth.IDEMP,
        Titre: this.rapport.Titre ,
        Commentaire: this.rapport.Commentaire , 
        Fichier: this.myRapport, 
        Date_creation: new Date().toLocaleString()
      }),
    }).then((res) => res.json());
    
  }
}
