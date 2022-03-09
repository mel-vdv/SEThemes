import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  //---------------------------------------------------------------------

  constructor(
    public commun: CommunService,
    private router: Router
  ) { }
//-------------------------------------------------------------------------------
  ngOnInit(): void {
    if (!this.commun.enCours) { this.debuter(); }
  }
  //----------------------------------------------------------------------------
  htmlMin!:string;htmlSec!:string;
  lancerLeTimer() {
    this.htmlMin = '00';
    this.htmlSec= '00';
    this.commun.timer=0;
    this.commun.timerOn = true;
    setInterval(() => { // !! fonction arrow et non focntion anonymous car 'this' !!
      if (this.commun.timer! < 15) {
        this.commun.timer!++;
        let min = Math.floor(this.commun.timer! / 60);
        let sec = this.commun.timer! - (min * 60);
        this.htmlMin = min < 10 ? '0' + min : min + '';
        this.htmlSec = sec < 10 ? '0' + sec : sec + '';
      }
      else {
        this.router.navigate(['/fin']);
      }
    }, 800);

  }
  //---------------------------------------------------------------------------
  debuter() {
    this.trio = [];
    this.commun.enCours = true;
    this.commun.timer = 0;
    this.commun.score = 0;
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
      'r1lb', 'b1lb', 'v1lb',

      'r2pb', 'b2pb', 'v2pb',
      'r3pb', 'b3pb', 'v3pb',
      'r1pd', 'b1pd', 'v1pd',
      'r2pd', 'b2pd', 'v2pd',
      'r3pd', 'b3pd', 'v3pd',
      'r1ps', 'b1ps', 'v1ps',
      'r2ps', 'b2ps', 'v2ps',
      'r3ps', 'b3ps', 'v3ps'
    ];
    this.commun.douze = [];
    for (let x = 0; x < 12; x++) {
      let random = Math.floor(Math.random() * this.commun.cartes.length);
      this.commun.douze.push({ perso: this.commun.cartes[random], classe: "no" });
      this.commun.cartes.splice(random, 1);
    }
    if (!this.commun.timerOn) { this.lancerLeTimer(); }

  }
  //************************************************************************************ */
  trio!: string[];
  index1 = 0;
  index2 = 0;
  index3 = 0;
  select(carte: string) {
    if (this.trio.length === 2) {
      this.trio.push(carte);
      this.index1 = this.commun.douze.findIndex((element: any) => element.perso === this.trio[0]);
      this.index2 = this.commun.douze.findIndex((element: any) => element.perso === this.trio[1]);
      this.index3 = this.commun.douze.findIndex((element: any) => element.perso === this.trio[2]);
      if (this.commun.douze[this.index3].classe === 'case') { this.commun.douze[this.index3].classe = 'case rouge'; }
      if (this.commun.douze[this.index3].classe = 'case rouge') { this.commun.douze[this.index3].classe = 'case'; this.trio.splice(this.index3, 1); return; }
      this.verifier();
      this.trio = [];
    }
    else {
      this.image = "rien";
      let index = this.commun.douze.findIndex((element: any) => element.perso === carte);

      if (this.commun.douze[index].classe === 'case') { this.commun.douze[index].classe = 'case rouge'; this.trio.push(carte); }
      else { this.commun.douze[index].classe = 'case'; this.trio.splice(index, 1); }

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
    if (this.commun.score === 2) {
      this.router.navigate(['fin']);
    }
    this.remplacer3();
  }
  //------------------
  loose() {
    this.set = false;
    this.image = "error";
    this.commun.douze.forEach((element: any) => {
      element.classe = 'case';
    });
  }
  //-------------------------
  remplacer3() {
    setTimeout(() => {
      this.commun.douze.forEach((element: any) => {
        element.classe = 'case';
      });
    }, 400);
    let hasard1 = Math.floor(Math.random() * this.commun.cartes.length);
    this.commun.douze.splice(this.index1, 1, { perso: this.commun.cartes[hasard1], classe: 'case' });
    this.commun.cartes.splice(hasard1, 1);

    let hasard2 = Math.floor(Math.random() * this.commun.cartes.length);
    this.commun.douze.splice(this.index2, 1, { perso: this.commun.cartes[hasard2], classe: 'case' });
    this.commun.cartes.splice(hasard2, 1);

    let hasard3 = Math.floor(Math.random() * this.commun.cartes.length);
    this.commun.douze.splice(this.index3, 1, { perso: this.commun.cartes[hasard3], classe: 'case' });
    this.commun.cartes.splice(hasard3, 1);
  }
  //-----------------------------------------
  home() {
    this.router.navigate(['/']);
  }
  //------------------------------------------
  restart() {
    this.debuter();
  }
  //--------------------------------------------------------------------------
  changerTheme() {
    this.router.navigate(['/theme']);
  }
  //------------------------------------------
  question() {
    this.remplacer3();
  }

}

