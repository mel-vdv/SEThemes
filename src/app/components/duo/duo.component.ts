import { CommunService } from './../../services/commun.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudservService } from './../../services/crudserv.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duo',
  templateUrl: './duo.component.html',
  styleUrls: ['./duo.component.scss']
})
export class DuoComponent implements OnInit {
  monpseudo!:string;monidauth!:string;monetat!:string;

  amis$!: any[]; mb$!: any[];
  choixPseudo = 'Je choisis mon pseudo';
  rech = "Pseudo d'un membre";
  inscrVis=true;
  //----------------------------------------
  constructor(
    private crud: CrudservService,
    private router: Router,
    public commun: CommunService,
    private ar: ActivatedRoute
  ) { }

  ///////////////////////////////////////////////////////////////////
  ngOnInit(): void {

    if (!this.commun.idu) {
      console.log('(f5) jeu : idu inconnu');
      this.ar.paramMap.subscribe((params: any) => {
        this.commun.idu = params.get('id');

      });
    }
    //1. pseudo deja inscrit?-------------------------------------
    this.crud.getIdauth(this.commun.idu).subscribe((data: any) => {
      
      if (data.length > 0) {
        console.log('idauth reconnu dans coll membres : inscrvis= false;');
        this.monpseudo = data[0].pseudo; this.monidauth= data[0].idauth; this.monetat=data[0].etat;
        this.commun.monpseudo = data[0].pseudo;
        this.inscrVis = false;
        this.listeAmis();
        this.listeMb();
        this.getData();
      }
      else {
        console.log('pas incrit: inscrvis=true')
        this.inscrVis = true;
      }
    });  }
    //2. les amis:-----------------------------------------------
   listeAmis(){ 
   this.crud.getAllAmis(this.monpseudo!).subscribe((data: any) => {
      this.amis$ = data;
    
      this.amis$.forEach(e => {
        e.repondreVis = false;
      })
    });}
    //3. les membres :-------------------------------------------
    listeMb(){
    this.crud.getAllMb().subscribe((data: any) => {
      this.mb$ = data;
      this.mb$ = this.mb$.filter(e => e.pseudo !== this.monpseudo);
      if(this.amis$){

      for (let i = 0; i < this.amis$.length; i++) {
        this.mb$ = this.mb$.filter(e => e.pseudo !== this.amis$[i].pseudo);
      }}
    });}
    //4. on récupère les donnees:--------------------------------
    getData(){
    this.crud.getId(this.commun.idu).subscribe((data: any) => {
      this.commun.mode = data.mode;
      this.commun.niveau = data.niveau;
      this.commun.theme = data.theme;
    //  console.log('depuis paramMap: ', this.commun.idu,',niveau: ', this.commun.niveau, ' ,mode: ', this.commun.mode);
    });
}
  /////////////////////////////////////////////////////////////////
  inviter(ami: string) {
    setTimeout(() => {
      this.crud.majMaCollek(this.monpseudo!,ami, { statut: 'defie' });
      this.crud.majCollekAmi(this.monpseudo! ,ami, { statut: 'defiepar' });
    }, 1000);

  }
  //------------------

  repondre(i: number) {
    this.amis$[i].repondreVis = true;
  }
  refuser(ami: string, i: number) {
    this.crud.majMaCollek(this.monpseudo!,ami, { statut: 'aucun' });
    this.crud.majCollekAmi(this.monpseudo!,ami, { statut: 'aucun' });
    this.amis$[i].repondreVis = false;
  }
  accepter(ami: string, i: number) {

    let idpartie = Math.floor(Math.random()*9999999);
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
    this.crud.majMaCollek(this.monpseudo!,ami, { statut: 'play', num: idpartie });
    this.crud.majCollekAmi(this.monpseudo!,ami, { statut: 'play', num: idpartie });
    this.crud.newPartie({
      id: idpartie,
      joueur1: this.monpseudo,
      joueur2: ami,
      cartes: cartes,
      douze: douze
    }).then(() => {
     // this.amis$[i].repondreVis = true;
      this.router.navigate([`/duel/${idpartie}`]);
    });
  }
  //-------------------------------------------------
  reprendre(num: string) {
    setTimeout(() => {

      this.router.navigate([`/duel/${num}`]);
    }, 1000);

  }
  //------------
  ajouter(pseudo: string,  idauth:string, etat: string) {
    console.log('ici',this.monpseudo!,this.monidauth!, this.monetat!, pseudo, idauth, etat);
    setTimeout(() => {
      this.crud.ajouter(this.monpseudo!,this.monidauth!, this.monetat!, pseudo, idauth, etat); // c'est ici que les collec mb-pseudo entrent en jeu, pas avant
      this.mb$ = this.mb$.filter(e => e.pseudo !== pseudo);
    }, 1000);

  }
  //---------
  annuler1() {
    this.choixPseudo = '';
  }
  //---------
  annuler2() {
    this.rech = '';
    this.rechVis = false;
  }
  //------------

  sinscrire() {
    if ((this.mb$.slice().filter(e => e.pseudo === this.choixPseudo)).length > 0) {
      this.choixPseudo = 'désolé, pseudo déjà pris';
    }
    else {  //2/ on enregistre 
      this.inscrVis = false;
      this.crud.inscr(this.choixPseudo, this.commun.idu);
    }
  }
  //-----------------------
  rechVis = false; resultat: any;
  rechercher() {
    this.crud.getMb(this.rech).subscribe((data: any) => {
      if (data.idauth) {
        this.resultat = data;
        this.rechVis = true;
        this.rech = "";
      }
      else {
        this.rech = 'Membre inconnu...';
        this.rechVis = false;
      }
    });
  }
  //--------------------
  copiercoller() {
    navigator.clipboard.writeText("Salut, je t'invite à me défier au jeu Set, rejoins-moi sur https://setheme-69d4d.firebaseapp.com/");

  }
}