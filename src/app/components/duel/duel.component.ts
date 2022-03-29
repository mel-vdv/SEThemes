import { ActivatedRoute, Router } from '@angular/router';
import { CrudservService } from './../../services/crudserv.service';
import { Component, OnInit } from '@angular/core';
import { CommunService } from 'src/app/services/commun.service';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.scss']
})
export class DuelComponent implements OnInit {

  constructor(
    private crud: CrudservService,
    private ar: ActivatedRoute,
    private router: Router,
    public commun: CommunService

  ) { }
 jeSuis!:number;
  maPartie?: any;
  idpartie!: string;
  // localement : (on envoie rien à firebase)

  lebuzzer!: string;
  set!: boolean;
  lum1!: string; lum2!: string;
  trio: any;

  //-*********************
  // TEMPS REEL : VALUE CHANGE ET SUBSCRIPTION !!!
  async ngOnInit() {

    this.setDetecte = false;

    this.ar.paramMap.subscribe((params: any) => {
      this.idpartie = params.get('id');
      this.crud.getPartieId(this.idpartie).subscribe((data: any) => {
      //1/ bdd parties: quel joueur suis-je?  
        this.maPartie = data;
        if(this.commun.monpseudo){
            this.jeSuis = this.commun.monpseudo==data.joueur1? 1: 2;
            console.log('je suis le joueur '+ this.jeSuis+ '(' + this.commun.monpseudo+')');
        }
        else{
          console.log('merde, monpseudo inconnu');
        }
        if (this.maPartie.douze.filter((e: any) => e.perso === 'vide').length === 12) { this.finish(); return; }
      });
    });
    this.trio = [];
  
    //2/bdd 'membres': gestion des connexions:
    this.crud.getMb(this.maPartie.joueur1).subscribe((data:any)=>{
    this.lum1 = data.etat ? 'co' : 'deco'; this.etatBuzzer();
  
    });
    this.crud.getMb(this.maPartie.joueur2).subscribe((data:any)=>{
      this.lum2 = data.etat ? 'co' : 'deco'; this.etatBuzzer();
      });

  }

  //----------------------- LE JEU  CLIK SUR 3 CARTES  ----------------------------
  //etape 0: couleur du buzzer:
  etatBuzzer(){
    if(this.lum1 =='deco' || this.lum2=='deco'){
      this.maPartie.posbuzz='milieu';this.maPartie.colorbuzz='eteint';
    }
    else{
      this.maPartie.posbuzz='milieu';this.maPartie.colorbuzz='orange';
    }
  }
  // etape 1 : on buzz  ******************************************************************
  buzzer() {
    switch (this.maPartie.colorbuzz) {
      case 'rouge': console.log('buzz deja rouge'); break;
      case 'orange':
        this.goTimer();
        let objet;
        switch (this.maPartie.posbuzz) {
          case 'milieu': objet = this.jeSuis == 1 ? { 'buzz': true, 'interdit2': true, 'colorbuzz': 'rouge', 'posbuzz': 'gauche' } : { 'buzz': true, 'interdit1': true, 'colorbuzz': 'rouge', 'posbuzz': 'droite' }; break;
          case 'droite': objet = this.jeSuis == 1 ? console.log('vous avez pas le droit de buzzer') : { 'buzz': true, 'colorbuzz': 'rouge' }; break;
          case 'gauche': objet = this.jeSuis == 1 ? { 'buzz': true, 'colorbuzz': 'rouge' } : console.log('vous avez pas le droit de buzzer'); break;
          default: console.log('pb: posbuzz');
        }
        if (this.maPartie.posbuzz == 'milieu' ||
          (this.maPartie.posbuzz == 'droite' && this.jeSuis == 2) || (this.maPartie.posbuzz == 'gauche' && this.jeSuis == 1)
        ) { this.crud.updateqqch(this.idpartie, objet); } break;
      case 'eteint': console.log('buzz éteint'); break;
      default: console.log('pb: colorbuzz');
    }
  }

  // ETAPE 2 : on clik sur 1 carte : trio[] **********************************************
  select(carte: string) {
    if (this.maPartie.colorbuzz == 'rouge') {
      switch (this.jeSuis) {
        case 1: if (this.maPartie.posbuzz === 'gauche') { this.dotrio(carte); }
        else { console.log('vous avez pas droit de cliquer'); } break;
        case 2: if (this.maPartie.posbuzz === 'droite') {
          this.dotrio(carte);
        } else { console.log('vous avez pas droit de cliquer') }; break;
        default: console.log('pb: je suis ni joueur 1 ni 2');
      }
    }
    else { console.log('il faut buzzer'); }
  }
  // etape 2bis : on fait un trio:**************************************************************

  dotrio(carte: string) {
    if (carte !== 'vide') {
      let index = this.maPartie.douze.findIndex((element: any) => element.perso === carte);
      if (this.maPartie.douze[index].classe !== 'case select') {
        if (this.trio.length < 3) {
          this.maPartie.douze[index].classe = 'case select'; this.trio.push(carte);
          this.crud.updateqqch(this.idpartie, { douze: this.maPartie.douze });
        }
        if (this.trio.length === 3) {
          this.verifier(this.trio!);
          clearInterval(this.tictac);this.timerVis=false;
          this.trio = [];
        }
      }
      else {
        this.maPartie.douze[index].classe = 'case'; this.trio = this.trio.filter((e: any) => e !== carte);
        this.crud.updateqqch(this.idpartie, { douze: this.maPartie.douze });
      }

    }
    else { console.log('case vide'); }
  }
  // etape 3 = on verifie si c'est un set : gain() ou loose()*********************************
  verifier(triss: any) {
    let prem = triss[0].split('');
    let second = triss[1].split('');
    let troisiem = triss[2].split('');
    if (((prem[0] === second[0] && prem[0] === troisiem[0]) || (prem[0] !== second[0] && prem[0] !== troisiem[0] && second[0] !== troisiem[0]))
      && ((prem[1] === second[1] && prem[1] === troisiem[1]) || (prem[1] !== second[1] && prem[1] !== troisiem[1] && second[1] !== troisiem[1]))
      && ((prem[2] === second[2] && prem[2] === troisiem[2]) || (prem[2] !== second[2] && prem[2] !== troisiem[2] && second[2] !== troisiem[2]))
      && ((prem[3] === second[3] && prem[3] === troisiem[3]) || (prem[3] !== second[3] && prem[3] !== troisiem[3] && second[3] !== troisiem[3]))
    ) {
      if (triss == this.trio) {
        console.log('gagné');
        this.gain();
      }
      else {
        console.log('un set detecté, tas barré');
        this.setDetecte = true;
      }
    }
    //pas de set**************
    else {
      if (triss == this.trio) {
        console.log('perdu');
        this.loose();
        for (let i = 0; i < 3; i++) {
          this.maPartie.douze.forEach((el: any) => {
            if (el.perso === this.trio[i]) { el.classe = 'case'; }
          });
        }
        this.crud.updateqqch(this.idpartie, { douze: this.maPartie.douze });
      }
      else {
        if (this.dernierCombi) {
          this.setDetecte = false;
          console.log('dernière combi : pas de set détecté');
          if (this.maPartie.cartes.length < 3) {
            console.log('comme pas de cartes : finito');
            this.finish();
          }
          else {
            console.log('il reste des cartes: on pioche');
            this.piocher();
          }
        }
      }
    }
  }
  //etape 4 : consequences:******************************************************************
  gain() {
    let objet;
    this.remplacer3();
    switch (this.jeSuis) {
      case 1: objet = {
        'score1': this.maPartie.score1 + 1, 'set1': true, classetoile1: 'etoile',
        'interdit2': false,
        'buzz': false,
        'colorbuzz': 'orange', 'posbuzz': 'milieu'
      }; break;
      case 2: objet = {
        'score2': this.maPartie.score2 + 1, 'set2': true, classetoile2: 'etoile',
        'interdit1': false,
        'buzz': false,
        'colorbuzz': 'orange', 'posbuzz': 'milieu'
      }; break;

      default: console.log('pb: je suis ni joueur 1 ni 2');
    }

    this.crud.updateqqch(this.idpartie, objet);
    setTimeout(() => {
      this.crud.updateqqch(this.idpartie, { classetoile1: 'invisible', classetoile2: 'invisible' });
    }, 2000);


  }
  //-----------------------------------------------------------------------------------------------
  loose() {
    switch (this.jeSuis) {
      case 1: this.crud.updateqqch(this.idpartie, { interdit1: true, interdit2: false, buzz: false, colorbuzz: 'orange', posbuzz: 'droite', classerreur1: 'erreur' });
        setTimeout(() => {
          this.crud.updateqqch(this.idpartie, { interdit1: false });
          if (this.maPartie.colorbuzz == 'orange' && this.maPartie.posbuzz == 'droite') { this.crud.updateqqch(this.idpartie, { colorbuzz: 'orange', posbuzz: 'milieu' }); }
        }, 15000);
        setTimeout(() => {
          this.crud.updateqqch(this.idpartie, { classerreur1: 'invisible' });
        }, 2000);
        break;
      case 2: this.crud.updateqqch(this.idpartie, { interdit2: true, interdit1: false, buzz: false, colorbuzz: 'orange', posbuzz: 'gauche', classerreur2: 'erreur' });
        setTimeout(() => {
          this.crud.updateqqch(this.idpartie, { interdit2: false });
          if (this.maPartie.colorbuzz == 'orange' && this.maPartie.posbuzz == 'gauche') { this.crud.updateqqch(this.idpartie, { colorbuzz: 'orange', posbuzz: 'milieu' }); }
        }, 15000);
        setTimeout(() => {
          this.crud.updateqqch(this.idpartie, { classerreur2: 'invisible' });
        }, 2000);
        break;
      default: console.log('pb loose: je suis ni joueur 1 ni 2');
    }
  }

  //----------------------------------------
  piocher() {
    for (let i = 0; i < 3; i++) {
      let l = this.maPartie.cartes.length;
      let n1 = Math.floor((i + 1) * 0.3 * l);
      this.maPartie.douze.splice(i, 1, { perso: this.maPartie.cartes[n1], classe: 'case' });
      this.maPartie.cartes.splice(n1, 1);
    }
  }
  //-------------------------
  index1 = 0;
  index2 = 0;
  index3 = 0;
  remplacer3() {
    console.log('on remplace les 3 cartes gagnées');

    this.index1 = this.maPartie.douze.findIndex((element: any) => element.perso === this.trio[0]);
    this.index2 = this.maPartie.douze.findIndex((element: any) => element.perso === this.trio[1]);
    this.index3 = this.maPartie.douze.findIndex((element: any) => element.perso === this.trio[2]);
    this.trio = [];

    if (this.maPartie.cartes.length > 2) {

      let hasard1 = Math.floor(Math.random() * this.maPartie.cartes.length);
      let hasard2 = Math.floor(Math.random() * (this.maPartie.cartes.length - 1));
      let hasard3 = Math.floor(Math.random() * (this.maPartie.cartes.length - 2));

      this.maPartie.douze.splice(this.index1, 1, { perso: this.maPartie.cartes[hasard1], classe: 'case' });
      this.maPartie.cartes.splice(hasard1, 1);
      this.maPartie.douze.splice(this.index2, 1, { perso: this.maPartie.cartes[hasard2], classe: 'case' });
      this.maPartie.cartes.splice(hasard2, 1);
      this.maPartie.douze.splice(this.index3, 1, { perso: this.maPartie.cartes[hasard3], classe: 'case' });
      this.maPartie.cartes.splice(hasard3, 1);
    }
    else {
      console.log('avant : tas vide, on va détecter..');
      this.maPartie.douze.splice(this.index1, 1, { perso: 'vide', classe: 'case' });
      this.maPartie.douze.splice(this.index2, 1, { perso: 'vide', classe: 'case' });
      this.maPartie.douze.splice(this.index3, 1, { perso: 'vide', classe: 'case' });

      this.detecterSet();
    }

    let objet = { cartes: this.maPartie.cartes, douze: this.maPartie.douze };

    this.crud.updateqqch(this.idpartie, objet).then(() => {
      if (this.maPartie.cartes.length < 3) {
        console.log('après : tas vide : on va détecter..');
        this.detecterSet();
      }
    });


  }
  //----------------------------------
  setDetecte?: boolean;
  dernierCombi?: boolean;
  arr12?: string[];
  combiArr: any;
  detecterSet() {
    this.setDetecte = false;
    this.dernierCombi = false;
    this.combiArr = [['']];
    this.arr12 = [];

    this.maPartie.douze.forEach((element: any) => {
      if (element.perso !== 'vide') {
        this.arr12?.push(element.perso);
      }

    });
    //1 tableau des combi : 
    this.arr12.forEach(e1 => {
      this.arr12 = this.arr12!.filter((x: any) => x !== e1);
      this.arr12.forEach(x => {
        this.arr12 = this.arr12!.filter((y: any) => y !== e1 && y !== x);
        this.arr12.forEach(y => {
          let combi = [];
          combi.push(e1, x, y);
          this.combiArr.push(combi);
        });
      });
    });
    this.combiArr.shift();

    //2 chercher un set pour chaque combi :

    for (let i = 0; i < this.combiArr.length; i++) {

      if (this.setDetecte) {
        return;
      }
      else {
        if (i == this.combiArr.length - 1) { console.log('dernier combi'); this.dernierCombi = true; }
        this.verifier(this.combiArr[i]);
      }
    }

  }
  //-------------------------------------
  finish() {
    console.log('pas de set, pas de cartes : partie finie');
    if (this.maPartie.score1 > this.maPartie.score2) {
      this.crud.updateqqch(this.idpartie, { gagnant: 'joueur1' });
      console.log('gagnant = joueur1');this.router.navigate([`/finduo/${this.idpartie}`]);
      return;
    }
    else {
      this.crud.updateqqch(this.idpartie, { gagnant: 'joueur2' });
      console.log('gagnant= joueur2');this.router.navigate([`/finduo/${this.idpartie}`]); 
    return;     
    } 
  }
  //-------------------------------------------
  timerVis!: boolean;
  timer!:number;
  tictac:any;
  goTimer() {
    this.timer=10;

    this.tictac = setInterval(()=>{
       this.timerVis = true;
      this.timer--;
      if(this.timer===0){console.log('temps écoulé');clearInterval(this.tictac);this.timerVis=false;this.loose();}
     
    },1000);
  }
  //------------------------------------------------
}
