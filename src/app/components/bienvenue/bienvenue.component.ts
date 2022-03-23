import { CommunService } from './../../services/commun.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrls: ['./bienvenue.component.scss']
})
export class BienvenueComponent implements OnInit {

  constructor(
    private router : Router,
    public commun : CommunService
  ) { }
  niveauVis= false;

  ngOnInit(): void {
  }
click(choix:any){
  setTimeout(()=>{
this.router.navigate([`/${choix}`]);
  }, 600);
}
//---------------------
clickNiveau(){
  this.niveauVis= true
}
choixNiveau(niv:number){
  this.commun.niveau = niv;
  console.log('niveau : ', this.commun.niveau);
  this.router.navigate(['/theme']);
}
//---------------------
}
