import { CrudservService } from './../../services/crudserv.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommunService } from './../../services/commun.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
    if(!this.commun.idu){
       this.authGoogle();
    }
        
this.userSub =  this.auth.authState 
.subscribe((user:any) =>{ 
this.user = user;
if(this.user){
  this.crud.getId(this.user.uid).subscribe((data:any)=>{
    if(data === undefined || !data){
      this.crud.creer(this.user);
      this.commun.idu = this.user?.uid;
    }
    else{
      this.commun.idu = this.user?.uid;
     // this.commun = data;  IT DON T WORK!!!!!!!!!!!!!!
     this.commun.totalSets = data.totalSets; 
     this.commun.secs = data.secs; 
     this.commun.sets = data.sets; 
     this.commun.inscrD = data.inscrD; 
     this.commun.recordD = data.recordD; 
    }
  })
}
})
 
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
  this.router.navigate([`/theme/${this.commun.idu}`]);
}
//---------------------
}
