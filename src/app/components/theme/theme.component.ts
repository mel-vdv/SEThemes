import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
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
  listChoix= ['normal','bonbons', 'bites','poissons', 'pommes']; 
  choix =this.listChoix[this.n];

  haut(){
    if( document.querySelector('.choix')!.className==='choix vert'){ document.querySelector('.choix')!.classList.remove('vert');}
    if(this.n===4){this.n=-1;} 
    this.n ++;
   this.choix = this.listChoix[this.n];

  }
  bas(){
    if( document.querySelector('.choix')!.className==='choix vert'){ document.querySelector('.choix')!.classList.remove('vert');}
    if(this.n===0){this.n=4;} 
   this.n--;
  this.choix= this.listChoix[this.n];

  }
  retour(){

    this.router.navigate(['/']);
  }

  choisir(){
    this.commun.theme = this.choix;
    document.querySelector('.choix')!.classList.toggle('vert');
   setTimeout(() => {
     this.router.navigate([`/challenge/${this.commun.idu}`]);
   }, 600); 
  }

}
