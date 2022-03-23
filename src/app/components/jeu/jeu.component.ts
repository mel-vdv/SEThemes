import { CrudservService } from './../../services/crudserv.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommunService } from 'src/app/services/commun.service';

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.scss']
})

export class JeuComponent implements OnInit {
  title = 'ng-setheme';
  set = false;
  image = "rien";
  trio!: string[];

  //---------------------------------------------------------------------

  constructor(
    public commun: CommunService,
    private router: Router,
    private ar : ActivatedRoute,
    private crud : CrudservService
  ) { }
  //-------------------------------------------------------------------------------
  ngOnInit(): void {

    if(!this.commun.idu){
      console.log('jeu : idu inconnu');
      this.ar.paramMap.subscribe((params: any) => {
     this.commun.idu = params.get('id');
 //on récupère les donnees:
 this.crud.getId(this.commun.idu).subscribe((data:any)=>{

 });
  });
   }

    this.trio=[];

    if (!this.commun.enCours) { 
      console.log('on debute'); 
      this.debuter(); }
  }
  //----------------------------------------------------------------------------

  //---------------------------------------------------------------------------
  debuter() {
    this.trio = [];
    this.commun.enCours = true;
    this.commun.timer = 0;
    this.commun.score = 0;
    if(this.commun.niveau==2){
    this.commun.cartes = [
      'r1rb', 'b1rb', 'v1rb',
      'r2rb', 'b2rb', 'v2rb',
      'r3rb', 'b3rb', 'v3rb',
      'r1rd', 'b1rd', 'v1rd',
      'r2rd', 'b2rd', 'v2rd',
      'r3rd', 'b3rd', 'v3rd',
      'r1rs', 'b1rs', 'v1rs',
      'r2rs', 'b2rs', 'v2rs',
      'r3rs', 'b3rs', 'v3rs',

      'r1lb', 'b1lb', 'v1lb',
      'r2lb', 'b2lb', 'v2lb',
      'r3lb', 'b3lb', 'v3lb',
      'r1ld', 'b1ld', 'v1ld',
      'r2ld', 'b2ld', 'v2ld',
      'r3ld', 'b3ld', 'v3ld',
      'r1ls', 'b1ls', 'v1ls',
      'r2ls', 'b2ls', 'v2ls',
      'r3ls', 'b3ls', 'v3ls',

      'r1pb', 'b1pb', 'v1pb',
      'r2pb', 'b2pb', 'v2pb',
      'r3pb', 'b3pb', 'v3pb',
      'r1pd', 'b1pd', 'v1pd',
      'r2pd', 'b2pd', 'v2pd',
      'r3pd', 'b3pd', 'v3pd',
      'r1ps', 'b1ps', 'v1ps',
      'r2ps', 'b2ps', 'v2ps',
      'r3ps', 'b3ps', 'v3ps'
    ];
  }
    else{
      this.commun.cartes=[
        'r1rb', 'b1rb', 'v1rb',
        'r2rb', 'b2rb', 'v2rb',
        'r3rb', 'b3rb', 'v3rb',
        'r1rd', 'b1rd', 'v1rd',
        'r2rd', 'b2rd', 'v2rd',
        'r3rd', 'b3rd', 'v3rd',
        'r1rs', 'b1rs', 'v1rs',
        'r2rs', 'b2rs', 'v2rs',
        'r3rs', 'b3rs', 'v3rs'
      ];
    }
    this.commun.douze = [];
    for (let x = 0; x < 12; x++) {
      let random = Math.floor(Math.random() * this.commun.cartes.length);
      this.commun.douze.push({ perso: this.commun.cartes[random], classe: "case" });
      this.commun.cartes.splice(random, 1);
    }
    if (!this.commun.timerOn) { this.commun.lancerLeTimer(); }

  }
  //************************************************************************************ */
  select(carte: string) {
    this.image = "rien";

    let index = this.commun.douze.findIndex((element: any) => element.perso === carte);


    if (this.commun.douze[index].classe !== 'case rouge') {
      if (this.trio.length < 3) {

        this.commun.douze[index].classe = 'case rouge'; this.trio.push(carte);

      }
      if (this.trio.length === 3) {
        this.verifier();
      }
    }
    else {
      this.commun.douze[index].classe = 'case'; this.trio = this.trio.filter((e: any) => e !== carte);
    }

  }
  //************************************************************************* */
  verifier() {
    let prem = this.trio[0].split('');
    let second = this.trio[1].split('');
    let troisiem = this.trio[2].split('');

    if (((prem[0] === second[0] && prem[0] === troisiem[0]) || (prem[0] !== second[0] && prem[0] !== troisiem[0] && second[0] !== troisiem[0]))
      && ((prem[1] === second[1] && prem[1] === troisiem[1]) || (prem[1] !== second[1] && prem[1] !== troisiem[1] && second[1] !== troisiem[1]))
      && ((prem[2] === second[2] && prem[2] === troisiem[2]) || (prem[2] !== second[2] && prem[2] !== troisiem[2] && second[2] !== troisiem[2]))
      && ((prem[3] === second[3] && prem[3] === troisiem[3]) || (prem[3] !== second[3] && prem[3] !== troisiem[3] && second[3] !== troisiem[3]))
    ) {
      this.gain();
    }
    else {
      this.loose();
    }
  }
  //********************************************************************** */
  gain() {
    this.image = "etoile";
    this.set = true;
    this.commun.score! ++;
    if ((this.commun.mode === '10sets' && this.commun.score === 10 && this.commun.niveau==2) ||(this.commun.mode === '10sets' && this.commun.score === 5 && this.commun.niveau==1)) {
      clearInterval(this.commun.tictac); this.commun.timerOn = false;
      this.commun.enregistrerPartie('10sets');
      this.router.navigate([`/fin/${this.commun.idu}`]);
      return;
    }
    this.remplacer3();
  }
  //------------------
  loose() {
    this.trio = [];
    this.set = false;
    this.image = "error";
    setTimeout(() => {
      this.commun.douze.forEach((element: any) => {
        element.classe = 'case';
      });
    }, 400);
  }
  //-------------------------
  index1 = 0;
  index2 = 0;
  index3 = 0;
  remplacer3() {
    this.index1 = this.commun.douze.findIndex((element: any) => element.perso === this.trio[0]);
    this.index2 = this.commun.douze.findIndex((element: any) => element.perso === this.trio[1]);
    this.index3 = this.commun.douze.findIndex((element: any) => element.perso === this.trio[2]);
    this.trio = [];

    let hasard1 = Math.floor(Math.random() * this.commun.cartes.length);
    let hasard2 = Math.floor(Math.random() * (this.commun.cartes.length - 1));
    let hasard3 = Math.floor(Math.random() * (this.commun.cartes.length - 2));

    this.commun.douze.splice(this.index1, 1, { perso: this.commun.cartes[hasard1], classe: 'case' });
    this.commun.cartes.splice(hasard1, 1);
    this.commun.douze.splice(this.index2, 1, { perso: this.commun.cartes[hasard2], classe: 'case' });
    this.commun.cartes.splice(hasard2, 1);
    this.commun.douze.splice(this.index3, 1, { perso: this.commun.cartes[hasard3], classe: 'case' });
    this.commun.cartes.splice(hasard3, 1);
  }
  //-----------------------------------------
  home() {
    this.commun.enCours = false; this.commun.timerOn = false;
    this.router.navigate(['/']);
  }
  //------------------------------------------
  restart() {
    this.debuter();
  }
  //--------------------------------------------------------------------------

  //------------------------------------------
  question() {
    for (let i = 0; i < 3; i++) {
      let l = this.commun.cartes.length;
      console.log('l: ', l);
      let n1 = Math.floor((i + 1) * 0.3 * l);
      this.commun.douze.splice(i, 1, { perso: this.commun.cartes[n1], classe: 'case' });
      this.commun.cartes.splice(n1, 1);
    }
    return;
  }
  //--------------------------------------------------

}

