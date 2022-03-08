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
  score = 0;
  temps = 0;
  htmlMin = '00';
  htmlSec = '00';
  theme = ''; douze?: any;
  trio = [''];
  index1 = 0;
  index2 = 0;
  index3 = 0;
  cartes = [
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
  //---------------------------------------------------------------------

  constructor(
    public commun: CommunService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.commun.theme = 'bonbons';
    this.debuter();
  }
  //--------------------------------------------------------------------------
 
  changerTheme() {
    this.router.navigate(['/theme']);
  }
  //----------------------------------------------------------------------------
  debuter() {
    setInterval(() => { // !! fonction arrow et non focntion anonymous car 'this' !!
      this.temps++;
      let min = Math.floor(this.temps / 60);
      let sec = this.temps - (min * 60);
      this.htmlMin = min < 10 ? '0' + min : min + '';
      this.htmlSec = sec < 10 ? '0' + sec : sec + '';
    }, 800);
    this.douze = [];
    for (let x = 0; x < 12; x++) {
      let random = Math.floor(Math.random() * this.cartes.length);
      this.douze.push({ perso: this.cartes[random], classe: "no" });
      this.cartes.splice(random, 1);
    }
  }
  //************************************************************************************ */
  select(carte?: any) {
    if (this.trio.length === 3) {
      
     this.trio.push(carte);
      this.index1 = this.douze.findIndex((element: any) => element.perso === this.trio[1]);
      this.index2 = this.douze.findIndex((element: any) => element.perso === this.trio[2]);
      this.index3 = this.douze.findIndex((element: any) => element.perso === this.trio[3]);
      if (this.douze[this.index3].classe === 'no') { this.douze[this.index3].classe = 'rouge';  } else { this.douze[this.index3].classe = 'no'; this.trio.splice(this.index3, 1);return; }
      
      this.verifier();
      this.trio = [''];
    }
    else {
      this.image = "rien";
      let index = this.douze.findIndex((element: any) => element.perso === carte);
      if (this.douze[index].classe === 'no') { this.douze[index].classe = 'rouge'; this.trio.push(carte); } else { this.douze[index].classe = 'no'; this.trio.splice(index, 1); }

    }
  }
  //************************************************************************* */
  verifier() {
    let prem = this.trio[1].split('');
    let second = this.trio[2].split('');
    let troisiem = this.trio[3].split('');

    if (((prem[0] === second[0] && prem[0] === troisiem[0]) || (prem[0] !== second[0] && prem[0] !== troisiem[0] && second[0] !== troisiem[0]))
      && ((prem[1] === second[1] && prem[1] === troisiem[1]) || (prem[1] !== second[1] && prem[1] !== troisiem[1] && second[1] !== troisiem[1]))
      && ((prem[2] === second[2] && prem[2] === troisiem[2]) || (prem[2] !== second[2] && prem[2] !== troisiem[2] && second[2] !== troisiem[2]))
      && ((prem[3] === second[3] && prem[3] === troisiem[3]) || (prem[3] !== second[3] && prem[3] !== troisiem[3] && second[3] !== troisiem[3]))
    ) {
      this.set = true;
      this.score++;
      this.image = "etoile";
      this.setOui();
    }
    else {
      this.set = false;
      this.image = "error";
      setTimeout(() => {
        this.douze.forEach((element: any) => {
          element.classe = 'no';
        });
      }, 400);
    }
  }
  //********************************************************************** */
  setOui() {
 setTimeout(() => {
    this.douze.forEach((element: any) => {
      element.classe = 'no';
    });
 }, 400);
    let hasard1 = Math.floor(Math.random() * this.cartes.length);
    this.douze.splice(this.index1, 1, { perso: this.cartes[hasard1], classe: 'no' });
    this.cartes.splice(hasard1, 1);

    let hasard2 = Math.floor(Math.random() * this.cartes.length);
    this.douze.splice(this.index2, 1, { perso: this.cartes[hasard2], classe: 'no' });
    this.cartes.splice(hasard2, 1);

    let hasard3 = Math.floor(Math.random() * this.cartes.length);
    this.douze.splice(this.index3, 1, { perso: this.cartes[hasard3], classe: 'no' });
    this.cartes.splice(hasard3, 1);
  }
  //------------------------------------------
  next(){
    this.setOui();
  }

}

