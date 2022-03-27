import { Router } from '@angular/router';
import { CrudservService } from './../../services/crudserv.service';
import { CommunService } from './../../services/commun.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duo',
  templateUrl: './duo.component.html',
  styleUrls: ['./duo.component.scss']
})
export class DuoComponent implements OnInit {

  constructor(
    private commun: CommunService,
    private crud: CrudservService,
    private router: Router
  ) { }
///////////////////////////////////////////////////////////////////
  ngOnInit(): void {
  }
  ///////////////////////////////////////////////////////////////////
accepterInvit(ami:string){
  //1/ creer la new partie:
let idpartie= '123';
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

let partie = {
  id : idpartie,
  joueur1 : 'mel',
  joueur2: ami,
  cartes : cartes,
  douze: douze
}
this.crud.newPartie(partie);

  //2/ aller jouer: duel.comp :
this.router.navigate([`/duel/${idpartie}`]);}
/////////////////////////////////////////////////////////////////

}