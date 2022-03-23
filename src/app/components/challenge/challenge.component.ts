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
    private ar : ActivatedRoute
  ) { }
  ngOnInit(): void {
    if(!this.commun.idu){
      this.ar.paramMap.subscribe((params: any) => {
     this.commun.idu = params.get('id');
  });
   }
  }

  n=0;
  listChoix= ['10sets','3min', '2players']; 
  choix =this.listChoix[this.n];

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
   setTimeout(() => {
     this.router.navigate([`/jeu/${this.commun.idu}`]);
   }, 600); 
  }

}

