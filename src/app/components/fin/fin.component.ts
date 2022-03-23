import { CommunService } from 'src/app/services/commun.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fin',
  templateUrl: './fin.component.html',
  styleUrls: ['./fin.component.scss']
})
export class FinComponent implements OnInit {

  constructor(
    private router : Router ,
    public commun : CommunService ,
    private ar : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.commun.enCours=false;
    if(!this.commun.idu){
      console.log('fin : idu inconnu');
      this.ar.paramMap.subscribe((params: any) => {
     this.commun.idu = params.get('id');
  });
   }
  }
  nav(loc:string){
    this.router.navigate([`/${loc}`]);
  }
  statVis=false;
  stat(){
this.statVis=true;
  }

}
