import { CrudservService } from './../../services/crudserv.service';
import { CommunService } from './../../services/commun.service';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'; // GROSSE GALERE
import {User} from 'firebase/auth';//idem
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  result:any;
  user?: User;// (interface fournie par firebase)
  userSub?: Subscription;
  constructor(  
    public commun : CommunService, 
    public crud: CrudservService ,
    public auth: AngularFireAuth,
    private router : Router ) { }
  //////////////////////////////////////////////
  ngOnInit(): void {
    this.commun.idu='';
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
//////////////////////////////////////////////////
  mode(choix:number){
    this.commun.theme= 'normal';
    this.commun.mode =  choix;
    setTimeout(()=>{this.router.navigate(['/jeu']);},1000);
  }
//-------------------------------------------
//connect:
async authGoogle(){
try{
this.result = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}
catch(err){
console.error(err);
}
}
/*
ngOnDestroy(): void {
  this.userSub?.unsubscribe();
}*/
}
