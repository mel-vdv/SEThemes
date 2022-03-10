import { CommunService } from 'src/app/services/commun.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fin',
  templateUrl: './fin.component.html',
  styleUrls: ['./fin.component.scss']
})
export class FinComponent implements OnInit {

  constructor(
    private router : Router ,
    public commun : CommunService
  ) { }

  ngOnInit(): void {
    this.commun.enCours=false;
  }
  nav(loc:string){
    this.router.navigate([`/${loc}`]);
  }
  statVis=false;
  stat(){
this.statVis=true;
  }

}
