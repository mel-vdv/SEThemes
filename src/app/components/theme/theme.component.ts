import { Router } from '@angular/router';
import { CommunService } from './../../services/commun.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  constructor(
    public commun: CommunService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  n=0;
  listChoix= ['normal','bonbons', 'bites']; 
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
    if( document.querySelector('.choix')!.className==='choix vert'){this.commun.theme = this.choix;
    } 
    this.router.navigate(['/']);
  }

  choisir(){
    document.querySelector('.choix')!.classList.toggle('vert');
  }

}
