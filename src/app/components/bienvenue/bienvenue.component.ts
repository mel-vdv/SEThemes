import { CrudservService } from './../../services/crudserv.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommunService } from './../../services/commun.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';

import firebase from 'firebase/compat/app'; //ne marche pas si j'oublie le 'app' !!!!


@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrls: ['./bienvenue.component.scss']
})
export class BienvenueComponent implements OnInit {

  constructor(
    private router: Router,
    public commun: CommunService,
    private auth: AngularFireAuth,
    private crud: CrudservService
  ) { }
  niveauVis = false;
  result: any;
  user?: User;// (interface fournie par firebase)
  userSub?: Subscription;
  //---------------------------------------------------
  ngOnInit(): void {
    console.log('ng on init');
  }

  //--------------------------------

  voirRegles() {
    setTimeout(() => {
      this.router.navigate([`/but`]);
    }, 600);
  }
  //---------------------
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
  async deco() {
    this.userSub?.unsubscribe();
    return this.auth.signOut().then(() => {
      console.log('idu deco: ', this.commun.idu);
    });
  }
    //-------------------------------------------------
//CONNEXION
    async authGoogle() {
      return this.auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result) => {
          console.log('authgoogle:', result);
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  //SUIS JE CONNECTE?
verifConnect(){
  this.userSub = this.auth.authState
  .subscribe((user: any) => {
    this.user = user;
    if (this.user) {
      console.log('user déjà connecté');
      this.crud.getId(this.user.uid).subscribe((data: any) => {
        if (data === undefined || !data) {
          console.log('user inconnu dans bdd perf : on cree new user', this.user!.uid);
          this.crud.creer(this.user);
          this.commun.idu = this.user!.uid;
          return;
        }
        else {
          console.log('uid déjà connu dans la bdd performances:', this.user!.uid);
          this.commun.idu = this.user!.uid;
          return;
        }
      });
    }
    else {
      console.log('pas de user : pas connecté');
      return;
    }
  });
}

}
