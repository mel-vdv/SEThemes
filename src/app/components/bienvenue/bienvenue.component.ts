import { CrudservService } from './../../services/crudserv.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommunService } from './../../services/commun.service';
import { Router } from '@angular/router';
import { Component, OnInit  } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';

import firebase from 'firebase/compat/app'; //ne marche pas si j'oublie le 'app' !!!!


@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrls: ['./bienvenue.component.scss']
})
export class BienvenueComponent implements OnInit{



  constructor(
    private router: Router,
    public commun: CommunService,
    private auth: AngularFireAuth,
    private crud: CrudservService
  ) { }
  niveauVis = false; language!:boolean;
  result: any;
  user?: User;// (interface fournie par firebase)
  userSub?: Subscription;
  on!:boolean;
  //---------------------------------------------------
  ngOnInit(): void {
   console.log('bien.init: on verif la connexion');
   this.verifConnect();

   this.language = true;
  }
  //--------------------------------

  voirRegles() {
    setTimeout(() => {
      this.router.navigate([`/but`]);
    }, 600);
  }
  //---------------------
  drapeau(lang:string){
    this.language= false;
    this.commun.language = lang;
    console.log('langue choisie: ',lang);
  }
  //----------------------------

  clickNiveau() {
    this.niveauVis = true;
  }
  choixNiveau(niv: number) {
    this.commun.niveau = niv;
    this.crud.majNiveau({ id: this.commun.idu, niveau: this.commun.niveau });
    this.router.navigate([`/theme/${this.commun.idu}`]);
    this.userSub?.unsubscribe();
  }
  //---------------------
// DECONNEXION 
  async decoGoogle() {
    this.userSub?.unsubscribe();
    return this.auth.signOut().then(() => {
      this.on=false;
      console.log(this.commun.idu,' est déconnecté de la bdd membres');
    });
  }
    //-------------------------------------------------
//CONNEXION
    async authGoogle() {
      return this.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result) => {
          console.log('authgoogle:', result);
          this.on=true;
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
//--------------------------------------------------------------------------------------------
verifConnect(){
  this.userSub = this.auth.authState
  .subscribe((user: any) => {
    this.user = user;
    if (this.user) {
      console.log('user déjà connecté');
      this.on= true;
      let userconnuSub= this.crud.getId(this.user.uid).subscribe((data: any) => {
        if (data === undefined || !data) {
          console.log('user inconnu dans bdd perf : on cree new user', this.user!.uid);
          this.crud.creer(this.user).then(()=>{
             this.commun.idu = this.user!.uid;
             this.userSub?.unsubscribe();
             userconnuSub.unsubscribe();
          });
        }
        else {
          console.log('uid déjà connu dans la bdd performances:', this.user!.uid);
          this.commun.idu = this.user!.uid;
          this.userSub?.unsubscribe();
          userconnuSub.unsubscribe();
        }
      });
    }
    else {
          this.on=false;
      console.log('pas de user : pas connecté');
    }
  });
}


}
