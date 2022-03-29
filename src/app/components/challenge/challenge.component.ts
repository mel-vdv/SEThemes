import { CrudservService } from './../../services/crudserv.service';
import { CommunService } from 'src/app/services/commun.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  constructor(
    private router : Router ,
    public commun : CommunService,
    private ar : ActivatedRoute ,
    private crud: CrudservService
  ) { }
  ngOnInit(): void {
    if(!this.commun.idu){
      this.ar.paramMap.subscribe((params: any) => {
     this.commun.idu = params.get('id');
  });
   }
   this.listChoix= this.commun.niveau===1? ['5sets','3min', '2players'] : ['10sets','3min', '2players'] ;
   this.choix = this.listChoix[this.n];
  }

  n=0;
  listChoix!:string[];
  choix!:string;

  haut(){
    if( document.querySelector('.choix')!.className==='choix vert'){ document.querySelector('.choix')!.classList.remove('vert');}
    if(this.n===2){this.n=-1;} 
    this.n ++;
   this.choix = this.listChoix[this.n];

  }
  bas(){
    if( document.querySelector('.choix')!.className==='choix vert'){ document.querySelector('.choix')!.classList.remove('vert');}
    if(this.n===0){this.n=3;} 
   this.n--;
  this.choix= this.listChoix[this.n];

  }
  retour(){
    this.router.navigate([`/theme/${this.commun.idu}`]);
  }

  choisir(){
    document.querySelector('.choix')!.classList.toggle('vert');
  this.commun.mode = this.choix;

  if(this.choix==='2players'){
    setTimeout(() => {
      this.router.navigate([`/duo/${this.commun.idu}`]);
    }, 600);
  }
  
     else{
       this.crud.majMode({id: this.commun.idu, mode: this.commun.mode});
       setTimeout(() => {this.router.navigate([`/jeu/${this.commun.idu}`]);
       }, 600);
         
     }

  }

}

