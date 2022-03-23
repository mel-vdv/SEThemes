import { CommunService } from 'src/app/services/commun.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  constructor(
    private router : Router ,
    public commun : CommunService
  ) { }
  ngOnInit(): void {
    
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
    this.router.navigate(['/theme']);
  }

  choisir(){
    document.querySelector('.choix')!.classList.toggle('vert');
  this.commun.mode = this.choix;
   setTimeout(() => {
     this.router.navigate(['/jeu']);
   }, 600); 
  }

}

