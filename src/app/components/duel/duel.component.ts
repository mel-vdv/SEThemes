
import { ActivatedRoute, Router } from '@angular/router';
import { CrudservService } from './../../services/crudserv.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommunService } from 'src/app/services/commun.service';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.scss']
})
export class DuelComponent implements OnInit, OnDestroy {

  constructor(
    private crud: CrudservService,
    private ar: ActivatedRoute,
    private router: Router,
    public commun: CommunService,


  ) { }
  /////////////
  /*
  @HostListener('window:unload', ['$event'])
  unloadHandler() {
    this.crud.deco(this.monpseudo);
    if (this.jeSuis == 1) {
      this.crud.coDuel1(this.maPartie.num, false);
    }
    else {
      this.crud.coDuel2(this.maPartie.num, false);
    }
  }*/
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler() {
    this.crud.deco(this.monpseudo);
    if (!this.commun.maPartie.finito) {
      if (this.jeSuis == 1) {
        this.crud.coDuel1(this.maPartie.num, false);
      }
      else {
        this.crud.coDuel2(this.maPartie.num, false);
      }
    }
  }

  //////////////////
  jeSuis!: number;
  monpseudo!: string;
  maPartie?: any;
  // localement : (on envoie rien à firebase)
  lebuzzer!: string;
  lum1!: string; lum2!: string;
  trio: any;
  //-*********************
  // TEMPS REEL : VALUE CHANGE ET SUBSCRIPTION !!!
  //je laisse le async devant on init??
  ngOnInit() {
    this.trio = [];
    this.setDetecte = false;
    this.maPartie = this.commun.maPartie;

    //1/ get param/this.commun ?
    if (this.commun.monpseudo && this.commun.maPartie.num && this.commun.j) {
      console.log(' On connait : ', this.commun.monpseudo, ' num ', this.commun.maPartie.num, ' joueur ', this.commun.j);
      this.jeSuis = this.commun.j;
      this.maPartie.num = this.commun.maPartie.num;
      this.connexion1ou2();
    }
    else {
      let par = this.ar.paramMap.subscribe((params: any) => {
        //0. param url : 
        this.jeSuis = parseInt(params.get('j')); this.commun.j = this.jeSuis;
        this.commun.maPartie.num = params.get('id');
        this.maPartie.num = this.commun.maPartie.num;
        this.connexion1ou2();
        par.unsubscribe();
      });
    }

  }
  //-------------------------------------------------------------------------------
  connexion1ou2() {
    this.maPartie = this.commun.maPartie;
    //2/ quel joueur suis-je? : connexion co 1/ co2
    if (this.commun.j == 1) {
      console.log('on init: co 1');
      this.crud.coDuel1(this.maPartie.num, true).then(() => {
        this.databuzzer();
      });
    }
    else {
      console.log('on init: co 2');
      this.crud.coDuel2(this.maPartie.num, true).then(() => {
        this.databuzzer();
      });
    }
  }
  //------------------------------------
  databuzzer() {
    //3/ data de la partie (bdd parties)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let majPartie = this.crud.getPartieId(this.maPartie.num).subscribe((data: any) => {
      this.maPartie = data;
      this.commun.maPartie = data;
      this.lum1 = data.co1 ? 'co' : 'deco';
      this.lum2 = data.co2 ? 'co' : 'deco';
      if (data.finito) {
        console.log('data.finito');
        this.beforeFinduo().then(()=>{
          this.router.navigate([`/finduo/${this.maPartie.num}/${this.monpseudo}`]);
          majPartie.unsubscribe();console.log('desabonné');
        })
        return;
      }
      this.etatBuzzer();

      this.monpseudo = this.jeSuis == 1 ? data.joueur1 : data.joueur2;
      this.crud.co(this.monpseudo);
      if (this.maPartie.douze.filter((e: any) => e.perso === 'vide').length === 12) { this.finish(); return; }
    });
  }

  //4/ couleur du buzzer:
  etatBuzzer() {
    if (!this.maPartie.co1 || !this.maPartie.co2) {
      this.maPartie.posbuzz = 'milieu'; this.maPartie.colorbuzz = 'eteint';
    }
    else {
      this.maPartie.colorbuzz = this.maPartie.buzz ? 'rouge' : 'orange';
      switch (this.maPartie.interdit) {
        case 0: this.maPartie.posbuzz = 'milieu'; break;
        case 1: this.maPartie.posbuzz = 'droite'; break;
        case 2: this.maPartie.posbuzz = 'gauche'; break;
        default: console.log('pb interdit 0/1/2?');
      }
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////
  //----------------------- LE JEU  CLIK SUR 3 CARTES  ----------------------------
  ///////////////////////////////////////////////////////////////////////////////////////

  // etape 1 : on buzz  ******************************************************************
  buzzer() {
    switch (this.maPartie.colorbuzz) {
      case 'rouge': console.log('buzz deja rouge'); break;
      case 'orange':
        switch (this.maPartie.posbuzz) {
          case 'milieu':
            if (this.jeSuis == 1) {
              console.log('buzz orange, on lance le timer'); this.goTimer();
              this.crud.updateqqch(this.maPartie.num, { 'buzz': true, 'interdit': 2, 'colorbuzz': 'rouge', 'posbuzz': 'gauche' });
            }
            else {
              console.log('buzz orange, on lance le timer'); this.goTimer();
              this.crud.updateqqch(this.maPartie.num, { 'buzz': true, 'interdit': 1, 'colorbuzz': 'rouge', 'posbuzz': 'droite' });
            }
            break;
          case 'droite':
            if (this.jeSuis == 1) {
              console.log('vous avez pas le droit de buzzer');
            }
            else {
              console.log('buzz orange, on lance le timer'); this.goTimer();
              this.crud.updateqqch(this.maPartie.num, { 'buzz': true, 'colorbuzz': 'rouge' });
            }
            break;
          case 'gauche':
            if (this.jeSuis == 2) {
              console.log('vous avez pas le droit de buzzer');
            }
            else {
              console.log('buzz orange, on lance le timer'); this.goTimer();
              this.crud.updateqqch(this.maPartie.num, { 'buzz': true, 'colorbuzz': 'rouge' });
            }
            break;
          default: console.log('pb: posbuzz');
        }
        break;
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
          this.crud.updateqqch(this.maPartie.num, { douze: this.maPartie.douze });
        }
        if (this.trio.length === 3) {
          this.verifier(this.trio!);
          clearInterval(this.tictac); this.timerVis = false;
          this.trio = [];
        }
      }
      else {
        this.maPartie.douze[index].classe = 'case'; this.trio = this.trio.filter((e: any) => e !== carte);
        this.crud.updateqqch(this.maPartie.num, { douze: this.maPartie.douze });
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
        console.log('gagné');if(this.maPartie.cartes.length==0 && !this.setDetecte){this.finish(); return;}
        else{  this.gain(); return;}
  
      }
      else {
        console.log('un set detecté, tas barré');
        this.setDetecte = true;
        return;
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
        this.crud.updateqqch(this.maPartie.num, { douze: this.maPartie.douze });
        return;
      }
      else {
        if (this.dernierCombi) {
          this.setDetecte = false;
          console.log('dernière combi : pas de set détecté');
          if (this.maPartie.cartes.length < 3) {
          
            console.log('comme pas de cartes : finish');
            if(!this.maPartie.finito){this.finish();}
            return;
          }
          else {
            console.log('il reste des cartes: on pioche');
            this.piocher();
            return;
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
        'score1': this.maPartie.score1+1, 'set1': true, classetoile1: 'etoile',
        'interdit': 0,
        'buzz': false,
        'colorbuzz': 'orange', 'posbuzz': 'milieu'
      }; break;
      case 2: objet = {
        'score2': this.maPartie.score2+1, 'set2': true, classetoile2: 'etoile',
        'interdit': 0,
        'buzz': false,
        'colorbuzz': 'orange', 'posbuzz': 'milieu'
      }; break;

      default: console.log('pb: je suis ni joueur 1 ni 2');
    }

    this.crud.updateqqch(this.maPartie.num, objet);
    setTimeout(() => {
      this.crud.updateqqch(this.maPartie.num, { classetoile1: 'invisible', classetoile2: 'invisible' });
    }, 2000);

  }
  //-----------------------------------------------------------------------------------------------
  loose() {
    switch (this.jeSuis) {
      case 1: this.crud.updateqqch(this.maPartie.num, { interdit: 1, buzz: false, colorbuzz: 'orange', posbuzz: 'droite', classerreur1: 'erreur' });
        setTimeout(() => {
          this.crud.updateqqch(this.maPartie.num, { interdit: 0 });
          // if (!this.maPartie.buzz) { this.crud.updateqqch(this.maPartie.num, { colorbuzz: 'orange', posbuzz: 'milieu' }); }
        }, 15000);
        setTimeout(() => {
          this.crud.updateqqch(this.maPartie.num, { classerreur1: 'invisible' });
        }, 2000);
        break;
      case 2: this.crud.updateqqch(this.maPartie.num, { interdit: 2, buzz: false, colorbuzz: 'orange', posbuzz: 'gauche', classerreur2: 'erreur' });
        setTimeout(() => {
          this.crud.updateqqch(this.maPartie.num, { interdit: 0 });
          if (!this.maPartie.buzz) { this.crud.updateqqch(this.maPartie.num, { colorbuzz: 'orange', posbuzz: 'milieu' }); }
        }, 15000);
        setTimeout(() => {
          this.crud.updateqqch(this.maPartie.num, { classerreur2: 'invisible' });
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
  remplacer3() { if(!this.maPartie.finito){
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
    this.crud.updateqqch(this.maPartie.num, objet).then(() => {
      /*if (this.maPartie.cartes.length < 3) {
        console.log('après : tas vide : on va détecter..');
        this.detecterSet();
      }*/
    });
  }}
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
  gagnant: any; perdant: any; scoreg: any; scorep: any; date: any;
  async beforeFinduo() {
    this.gagnant = this.maPartie.score1 > this.maPartie.score2 ? this.maPartie.joueur1 : this.maPartie.joueur2;
    this.perdant = this.maPartie.score1 > this.maPartie.score2 ? this.maPartie.joueur2 : this.maPartie.joueur1;
    this.scoreg = this.maPartie.score1 > this.maPartie.score2 ? this.maPartie.score1+1 : this.maPartie.score2+1;
    this.scorep = this.maPartie.score1 > this.maPartie.score2 ? this.maPartie.score2 : this.maPartie.score1;
    this.date = Date.now() + '';
    if (this.monpseudo == this.gagnant) {
      return this.commun.maStatToday = {
        gain: true, adv: this.perdant, score: this.scoreg, scoreadv: this.scorep
      };
    }
    else {
      return this.commun.maStatToday = {
        gain: false, adv: this.gagnant, score: this.scorep, scoreadv: this.scoreg
      }
    }
  }
  finish() {
    if (!this.commun.maPartie.finito||!this.maPartie.finito){ 
      this.maPartie.finito=true; this.commun.maPartie.finito=true;
       //1/ on declare a l'adv que c'est finito
      this.crud.updateqqch(this.maPartie.num, { finito: true });
      console.log('pas de set, pas de cartes : partie finie');

      this.beforeFinduo().then(() => {
        //2/ on enregistre perf/kli/historique/{adv:gain:score:scoreadv:date}

        this.crud.creerHisto(this.gagnant, this.perdant, this.scoreg, this.scorep, true, this.date);
        this.crud.creerHisto(this.perdant, this.gagnant, this.scorep, this.scoreg, false, this.date);
        //3/ on met à jour les statuts: mb-max et mb-mel : statut : aucun
        this.crud.majCollekAmi(this.gagnant, this.perdant, { statut: 'aucun' });
        this.crud.majCollekAmi(this.perdant, this.gagnant, { statut: 'aucun' });
      }).then(()=>{
         this.router.navigate([`/finduo/${this.maPartie.num}/${this.monpseudo}`]);
      });
     
    }//------------------------------------------------------------------------------
    return;
  }
  //-------------------------------------------
  timerVis!: boolean;
  timer!: number;
  tictac: any;
  goTimer() {
    console.log('go timer();')
    this.timer = 10; this.timerVis = true;
    this.tictac = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        console.log('temps écoulé');
        clearInterval(this.tictac); this.timerVis = false; this.loose();
      }

    }, 1000);
  }
  //-----------
  abandonner() {
    console.log('abandon');

  }
  ///////////////////////////////////////////////////////////////
  async ngOnDestroy() {
    await this.crud.deco(this.monpseudo);




    if (!this.commun.maPartie.finito) {
      if (this.jeSuis == 1) {

        console.log('duel.destroy: co1');

        await this.crud.coDuel1(this.maPartie.num, false);
      }
      else {
        console.log('duel.destroy: co2');
        await this.crud.coDuel2(this.maPartie.num, false);
      }
    }

  }
}
