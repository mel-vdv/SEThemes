import { CommunService } from './../../services/commun.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(  public commun : CommunService,
    private router : Router ) { 
  
  }

  ngOnInit(): void {
  }
  mode(choix:number){
   
    this.commun.theme= 'bonbons';
    this.commun.mode =  choix;
    setTimeout(()=>{this.router.navigate(['/jeu']);},1000);
  }

}
