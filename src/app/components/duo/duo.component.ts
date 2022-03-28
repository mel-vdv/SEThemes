import { Router } from '@angular/router';
import { CrudservService } from './../../services/crudserv.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duo',
  templateUrl: './duo.component.html',
  styleUrls: ['./duo.component.scss']
})
export class DuoComponent implements OnInit {
moi= 'mel des bois';  amis$!:any[]; mb$!:any[];
monPseudo='Je choisis mon pseudo';
rech= "Entre le pseudo d'un membre inscrit";

//----------------------------------------
  constructor(
    private crud: CrudservService,
    private router: Router
  ) { }

///////////////////////////////////////////////////////////////////
  ngOnInit(): void {
    //1. les amis:
    this.crud.getAllAmis().subscribe((data:any)=>{
      this.amis$= data;
      this.amis$.forEach(e=>{
        e.repondreVis=false;
      })
           }); 
    //2. les membres :
    this.crud.getAllMb().subscribe((data:any)=>{
      this.mb$= data;
      for(let i=0; i<this.amis$.length;i++){ 
       this.mb$ =  this.mb$.filter(e=>e.pseudo !== this.amis$[i].pseudo && e.pseudo!== this.moi);}
           }); 
          }
/////////////////////////////////////////////////////////////////


inviter(ami:string){
  setTimeout(() => {
     this.crud.majMaCollek(ami, {statut:'defie'});
  this.crud.majCollekAmi(ami, {statut:'defiepar'});
  }, 1000);

}
//------------------

repondre(i:number){
this.amis$[i].repondreVis=true;
}
refuser(ami:string, i:number){
this.crud.majMaCollek(ami,{statut:'aucun'});
this.crud.majMaCollek(ami,{statut:'aucun'});
this.amis$[i].repondreVis=false;
}
accepter(ami:string, i:number){
  
 let idpartie='456';
 let douze = [];
let cartes =       
['r1rb', 'b1rb', 'v1rb',
'r2rb', 'b2rb', 'v2rb',
'r3rb', 'b3rb', 'v3rb',
'r1rd', 'b1rd', 'v1rd',
'r2rd', 'b2rd', 'v2rd',
'r3rd', 'b3rd', 'v3rd',
'r1rs', 'b1rs', 'v1rs',
'r2rs', 'b2rs', 'v2rs',
'r3rs', 'b3rs', 'v3rs'];
  for (let x = 0; x < 12; x++) {
    let random = Math.floor(Math.random() * cartes.length);
    douze.push({ perso: cartes[random], classe: "case" });
    cartes.splice(random, 1);
  }
 //---------------------------------------------------
 this.crud.majMaCollek(ami, {statut: 'play', num: idpartie});
 this.crud.majCollekAmi(ami, {statut:'play', num: idpartie});
 this.crud.newPartie({
id: idpartie,
joueur1:this.moi,
joueur2:ami,
cartes:cartes,
douze:douze
 }).then(()=>{
  this.amis$[i].repondreVis=true;
    this.router.navigate([`/duel/${idpartie}`]);
 });}
 //-------------------------------------------------
 reprendre(num:string){
   setTimeout(() => {
   
      this.router.navigate([`/duel/${num}`]);
   }, 1000);
 
}
//------------
ajouter(mb:string, etat: string){
  setTimeout(() => {
    this.crud.ajouter(mb,etat);
    this.mb$.filter(e=>e.pseudo!==mb);
  }, 1000);

}
//---------
annuler1(){
  this.monPseudo='';
}
//---------
annuler2(){
  this.rech='';
  this.rechVis=false;
}
//------------
inscrVis=true;
enregistrer(){
if((this.mb$.slice().filter(e=>e.pseudo===this.monPseudo)).length>0){
  this.monPseudo='désolé, pseudo déjà pris';
}
else{  //2/ on enregistre 
this.inscrVis=false;
this.crud.inscr(this.monPseudo);
}
}
//-----------------------
rechVis=false; resultat:any; 
rechercher(){
this.crud.getMb(this.rech).subscribe((data:any)=>{
  if(data.idauth){
    this.resultat= data;
    this.rechVis=true;
    this.rech="";
  }
  else{
this.rech= 'Membre inconnu...';
this.rechVis=false;
  }
  });
}
//--------------------
copiercoller(){
  navigator.clipboard.writeText("Salut, je t'invite à me défier au jeu Set, rejoins-moi sur https://setheme-69d4d.firebaseapp.com/");

}
}