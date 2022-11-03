import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
var localForage = require('localforage');

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
  routeParams?: any;
  edit: boolean = false;
  read: boolean = false;
  reference: String = '';
  rapport: Rapport = {};
  auth: any;
  myRapport?: File | null;
  myRapportName: String = '';
  isLoading: boolean = false;

  currentRapport: FullRapportFormat = {};
  raiseSuccessLogin: any;
  raiseErrorLogin: any;

  constructor(private route: Router, private activeRoute: ActivatedRoute) {
    this.checkAuth(activeRoute);
  }

  async checkAuth(activeRoute: ActivatedRoute) {
    this.auth = await localForage.getItem('auth');

    console.log(this.auth);

    if (this.auth) {
      this.mobile = this.auth.Mobile;
      setInterval(() => {
        this.date = new Date().toLocaleString();
      }, 1000);

      activeRoute.queryParams.subscribe(async (params: any) => {
        console.log('queryParams', params);

        if (params.reference && params.reference.length > 0) {
          this.routeParams = await localForage.getItem('preview');

          this.edit = Boolean(this.routeParams.edit);

          this.read = Boolean(this.routeParams.read);

          this.reference = this.routeParams.id;

          this.getOneRapport();
        }
      });
    } else {
      this.route.navigate(['']);
    }
  }
  async getOneRapport() {
    const URL_RAPPORT = 'http://localhost:8000/api/v1/make/rapport';

    let body = JSON.stringify({
      allBy: true,
      IDEMP: this.auth.IDEMP,
      IDRAPPORT: this.reference,
    });

    console.log(body);

    let data = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: body,
    }).then((res) => res.json());

    if (data.code == 'success') {
      this.currentRapport = {
        IDRAPPORT: data.message[0].IDRAPPORT,
        Titre: data.message[0].Titre,
        Commentaire: data.message[0].Commentaire,
        Date_creation: data.message[0].Date_creation,
        Fichier: data.message[0].Fichier,
      };

      this.rapport.Titre = this.currentRapport.Titre as string;
      this.rapport.Commentaire = this.currentRapport.Commentaire as string;
    } else {
      console.log(data.message);
    }
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.myRapport = file;
      this.myRapportName = file.name;
    }
  }

  async submitRapport() {
    this.isLoading = true;

    console.log(this.myRapport);
    console.log(this.rapport);

    const URL_RAPPORT = 'http://localhost:8000/api/v1/make/rapport';

    if (!this.rapport.Titre) return;

    if (!this.rapport.Commentaire) return;

    if (!this.auth.IDEMP) return;

    var base64: any;

    const reader = new FileReader();
    reader.onloadend = () => {
      base64 = reader.result;
    };
    reader.readAsDataURL(this.myRapport as Blob);

    setTimeout(async () => {
      let data = await fetch(URL_RAPPORT, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          create: true,
          IDEMP: this.auth.IDEMP,
          Titre: this.rapport.Titre,
          Commentaire: this.rapport.Commentaire,
          Fichier: base64,
          Date_creation: new Date().toLocaleString(),
        }),
      }).then((res) => res.json());

      if (data.code == 'success') {
        this.myRapport = null;
        this.myRapportName = '';
        this.rapport.Titre = '';
        this.rapport.Commentaire = '';
        this.raiseSuccessLogin = data.message;
      } else {
        this.raiseErrorLogin = data.message;
      }

      this.isLoading = false;
    }, 4000);
  }

  submitModifRapport() {

    this.isLoading = true;

    const URL_RAPPORT = 'http://localhost:8000/api/v1/make/rapport';

    if (!this.rapport.Titre) return;

    if (!this.rapport.Commentaire) return;

    if (!this.auth.IDEMP) return;

    var base64: any = "";

   if( this.myRapport as Blob ){
    const reader = new FileReader();
    reader.onloadend = () => {
      base64 = reader.result;
    };
    reader.readAsDataURL(this.myRapport as Blob);
   }

   setTimeout(async () => {
    let data = await fetch(URL_RAPPORT, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        update: true,
        IDEMP: this.auth.IDEMP,
        IDRAPPORT: this.reference,
        Titre: this.rapport.Titre,
        Commentaire: this.rapport.Commentaire,
        Fichier: base64,
        Date_creation: new Date().toLocaleString(),
      }),
    }).then((res) => res.json());

    if (data.code == 'success') {
      this.raiseSuccessLogin = data.message;
    } else {
      this.raiseErrorLogin = data.message;
    }

    this.isLoading = false;
  }, 4000);
    

  }


  openRapport() {
    let file = this.currentRapport.Fichier;

    let titre = "RAPPORT D'ACTIVITE DE " + (this.auth.Nom as string).toUpperCase() + " " + (this.auth.Prenom  as string).toUpperCase() + " " + (this.currentRapport.Date_creation as string).replace("/","_");
    var anchor = document.createElement('a');
    anchor.href = file as string;
    anchor.download = titre;
    document.body.appendChild(anchor);
    anchor.click();

    let pdfWindow = window.open('', '_blank', titre);

    pdfWindow?.document.write(
      "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
        encodeURI(file as string) +
        "'></iframe></body>"
    );
  }
}
