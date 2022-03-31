import { CrudservService } from './../../services/crudserv.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finduo',
  templateUrl: './finduo.component.html',
  styleUrls: ['./finduo.component.scss']
})
export class FinduoComponent implements OnInit {

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private crud : CrudservService
  ) { }
//------------
monpseudo!:string;
mesStat$:any;
maStatToday:any;
//-------------------
  ngOnInit(): void {
    this.ar.paramMap.subscribe((params: any) => {
      this.monpseudo = params.get('pseudo');
      // de là on récupère les stat du pseudo : 
      this.crud.getStat(this.monpseudo).subscribe(data=>{
        this.mesStat$ = data;
        this.maStatToday = data.slice().pop();
    
      });
    });
  } 
//-----------
statVis=false;
stat(){
this.statVis=true;
}
//---------
nav(){
  this.router.navigate(["/"]);
}
//----------


}
