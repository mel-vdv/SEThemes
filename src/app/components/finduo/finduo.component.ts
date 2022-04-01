import { CommunService } from 'src/app/services/commun.service';
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
    private crud : CrudservService,
    public commun: CommunService
  ) { }
//------------
monpseudo!:string;
mesStat$:any;
maStatToday:any;
//-------------------
  ngOnInit(): void {
    if(this.commun.maStatToday){this.maStatToday = this.commun.maStatToday;}
    this.ar.paramMap.subscribe((params: any) => {
      this.monpseudo = params.get('pseudo');
      let idpartie =params.get('idpartie');
      // 1/ de là on récupère les stat du pseudo : 
      this.crud.getStat(this.monpseudo).subscribe(data=>{
        this.mesStat$ = data;
        this.maStatToday = data[0];
        this.commun.maStatToday= data[0];
      });
      //2/ on delete le doc  n-partie:
       this.crud.deletePartie(idpartie);
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
