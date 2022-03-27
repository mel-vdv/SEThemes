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

  trio!: string[];
  classetoile= 'invisible';
  classerror= 'invisible';



  //---------------------------------------------------------------------

  constructor(
    public commun: CommunService,
    private router: Router,
    private ar: ActivatedRoute,
    private crud: CrudservService
  ) { }
  //-------------------------------------------------------------------------------
  ngOnInit(): void {

    if (!this.commun.idu) {
      console.log('(f5) jeu : idu inconnu');
      this.ar.paramMap.subscribe((params: any) => {
        this.commun.idu = params.get('id');
        //on récupère les donnees:
       this.crud.getId(this.commun.idu).subscribe((data: any) => {
         this.commun.mode = data.mode;
         this.commun.niveau = data.niveau;
         this.commun.theme = data.theme;
         console.log('depuis paramMap: ', this.commun.idu, this.commun.idu, this.commun.niveau, this.commun.mode);
        });
      });
    }
    else{
      console.log('idu/niveau/theme/mode sont déjà connus', this.commun.idu, this.commun.idu, this.commun.niveau, this.commun.mode);
    }

    this.trio = [];

    if (!this.commun.enCours) {
      console.log('on debute');
      this.debuter();
    }
    else{
      console.log('partie en cours');
    }
  }
  //----------------------------------------------------------------------------

  //---------------------------------------------------------------------------
  debuter() {
    this.trio = [];
    this.commun.enCours = true;
    this.commun.timer = 0;
    this.commun.score = 0;
    if (this.commun.niveau == 2) {
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
    else {
      this.commun.cartes = [
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


    let index = this.commun.douze.findIndex((element: any) => element.perso === carte);


    if (this.commun.douze[index].classe !== 'case rouge') {
      if (this.trio.length < 3) {

        this.commun.douze[index].classe = 'case rouge'; this.trio.push(carte);

      }
      if (this.trio.length === 3) {
        this.verifier(this.trio!);
      }
    }
    else {
      this.commun.douze[index].classe = 'case'; this.trio = this.trio.filter((e: any) => e !== carte);
    }

  }
  //************************************************************************* */
  verifier(triss: string[]) {
    let prem = triss[0].split('');
    let second = triss[1].split('');
    let troisiem = triss[2].split('');
//set : 
    if (((prem[0] === second[0] && prem[0] === troisiem[0]) || (prem[0] !== second[0] && prem[0] !== troisiem[0] && second[0] !== troisiem[0]))
      && ((prem[1] === second[1] && prem[1] === troisiem[1]) || (prem[1] !== second[1] && prem[1] !== troisiem[1] && second[1] !== troisiem[1]))
      && ((prem[2] === second[2] && prem[2] === troisiem[2]) || (prem[2] !== second[2] && prem[2] !== troisiem[2] && second[2] !== troisiem[2]))
      && ((prem[3] === second[3] && prem[3] === troisiem[3]) || (prem[3] !== second[3] && prem[3] !== troisiem[3] && second[3] !== troisiem[3]))
    ) {
      if (triss === this.trio) { 
        this.classetoile= 'etoile';this.classerror="invisible"; setTimeout(() => {
          this.classetoile='invisible';
        }, 2000);
        //console.log('bravo');
        this.gain(); }
      else { 
        //console.log('set détecté..le voici:');
        this.setDetecte = true;
      this.showSolution(triss); }
    }
//pas de set : 
    else {
      if (triss === this.trio) {this.classetoile= 'invisible';this.classerror="error"; setTimeout(() => {
        this.classerror='invisible';
      }, 2000);
        //console.log('faux'); 
        this.loose(); }
      else {
        //encore des douze?
        if(this.commun.douze.length<3){
          console.log('reste moins de 3 cartes en jeu');
          this.finish();
        }
        else{
          //est ce la dernière combinaison? 
        //non= le foreach continue
        if(this.dernierCombi){
          console.log('douze cartes:', this.commun.douze.length);
          //oui : 
        // reste il des cartes à piocher?
        console.log('il reste : ', this.commun.cartes.length, 'cartes à piocher');
        //oui:
        if (this.commun.cartes.length > 2) {
          console.log('on pioche');
          this.piocher();
        }
        //non:
        else {
          console.log('finito');
          this.finish();
        }
        }
        }
      }
    }
  }
  //********************************************************************** */
  gain() {
 
    this.set = true;
    this.commun.score! ++;
    if ((this.commun.mode === '10sets' && this.commun.score === 10 ) || (this.commun.mode === '5sets' && this.commun.score === 5 ) ||
    (this.commun.douze.length<3 && this.commun.cartes.length<3)) {
      clearInterval(this.commun.tictac); this.commun.timerOn = false; 
      this.commun.enregistrerPartie(); console.log('timer:',this.commun.timer);
      this.router.navigate([`/fin/${this.commun.idu}`]);
      return;
    }
    this.remplacer3();
  }
  //------------------
  loose() {
    this.trio = [];
    this.set = false;
   
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
    this.commun.cartes.splice(hasard3, 1);}


  
  //-----------------------------------------
  home() {
    this.commun.enCours = false; this.commun.timerOn = false;
    this.router.navigate(['/']);
  }
  //------------------------------------------
  restart() {
    this.debuter();
  }
  //-----------------------------------------------------
  setDetecte?: boolean;
  dernierCombi?:boolean;
  arr12?: string[];
  combiArr:any;
  help() {
    this.commun.timer= this.commun.timer! + 15;
    this.setDetecte = false; 
    this.dernierCombi=false;
    this.combiArr=  [['']];
    this.arr12 = [];

    this.commun.douze.forEach((element: any) => {
      if(element.perso !== undefined && element.perso!== 'null'){
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

    for(let i=0; i<this.combiArr.length; i++){

      if(this.setDetecte){
        return;
      }
      else{
        if(i==this.combiArr.length-1){this.dernierCombi=true;}
        this.verifier(this.combiArr[i]);
      }
    }
 
  }
  //--------------------------------------------------
  showSolution(solution:any) {
    this.commun.douze.filter((e:any)=>{
        if(e.perso===solution[0]||e.perso===solution[1]||e.perso===solution[2]){
         e.classe='case jaune'; 
          }
        }); 
  }
  //-------------------------------------------------
  finish() {
   
    console.log('pas de sets, pas de cartes,fin de partie');
    clearInterval(this.commun.tictac);
    this.commun.timerOn = false;
    this.commun.enregistrerPartie();
    setTimeout(() => {
      this.router.navigate([`/fin/${this.commun.idu}`]);
    }, 2000);
    
  }
  //-----------------------------------------------
  piocher() {

    if(this.commun.cartes.length>2){
       for (let i = 0; i < 3; i++) {
      let l = this.commun.cartes.length;
      let n1 = Math.floor((i + 1) * 0.3 * l);
      this.commun.douze.splice(i, 1, { perso: this.commun.cartes[n1], classe: 'case' });
      this.commun.cartes.splice(n1, 1);
    }
    }
    else{
this.finish();
    }
   
    
  }



}

