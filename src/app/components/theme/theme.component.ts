import { CrudservService } from './../../services/crudserv.service';
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
    private ar : ActivatedRoute ,
    private crud: CrudservService
  ) { }

  ngOnInit(): void {
    if(!this.commun.idu){
       this.ar.paramMap.subscribe((params: any) => {
      this.commun.idu = params.get('id');
   });
    } 
    this.listChoix= this.commun.niveau===1? ['normal','bonbons','poissons', 'pommes'] :  ['normal','bonbons', 'bites','poissons'];  

    this.choix =this.listChoix[this.n];
  }

  n=0;
  listChoix!:string[]; 
 choix!:string;

  haut(){
    if( document.querySelector('.choix')!.className==='choix vert'){ document.querySelector('.choix')!.classList.remove('vert');}
    if(this.n===3){this.n=-1;} 
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
    this.crud.majTheme({id: this.commun.idu, theme: this.commun.theme});
   setTimeout(() => {
     this.router.navigate([`/challenge/${this.commun.idu}`]);
   }, 600); 
  }

}
