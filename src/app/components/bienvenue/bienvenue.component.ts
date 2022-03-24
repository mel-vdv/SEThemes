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
export class BienvenueComponent implements OnInit, OnDestroy {

  constructor(
    private router : Router,
    public commun : CommunService,
    private auth: AngularFireAuth,
    private crud : CrudservService
  ) { }
  niveauVis= false;
  result:any;
  user?: User;// (interface fournie par firebase)
  userSub?: Subscription;
//---------------------------------------------------
  ngOnInit(): void {
    console.log("idu:", this.commun.idu);
 if(!this.commun.idu){
   this.userSub =  this.auth.authState 
.subscribe((user:any) =>{ 
this.user = user;
if(this.user){
  this.crud.getId(this.user.uid).subscribe((data:any)=>{
    if(data === undefined || !data){
      console.log('on cree new user');
      this.crud.creer(this.user);
      this.commun.idu = this.user?.uid;
    }
    else{
      this.commun.idu = this.user?.uid; 
      console.log('IDU',this.commun.idu);
    }
  })
}
else{
  console.log('authgoogle');
       this.authGoogle(); 
}
});}
        

  }
  //-------------------------------------------------
  async authGoogle(){
      try{
      this.result = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      }
      catch(err){
      console.error(err);
      }
      }
      //-------------------------------------------

voirRegles(){
  setTimeout(()=>{
this.router.navigate([`/but`]);
  }, 600);
}
//---------------------
clickNiveau(){
  this.niveauVis= true
}
choixNiveau(niv:number){
  this.commun.niveau = niv;
  this.crud.majNiveau({id: this.commun.idu, niveau: this.commun.niveau});
  this.router.navigate([`/theme/${this.commun.idu}`]);
  this.userSub?.unsubscribe();
}
//---------------------
ngOnDestroy(): void {
  this.userSub?.unsubscribe();
}
}
