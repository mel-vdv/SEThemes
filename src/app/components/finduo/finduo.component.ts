import { CommunService } from 'src/app/services/commun.service';
import { CrudservService } from './../../services/crudserv.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-finduo',
  templateUrl: './finduo.component.html',
  styleUrls: ['./finduo.component.scss']
})
export class FinduoComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private crud: CrudservService,
    public commun: CommunService
  ) { }
  //------------
  monpseudo!: string;
  mesStat$: any;
  maStatToday: any;
  recupsub:any;statsub:any;
  //-------------------
  ngOnInit(): void {
    console.log("finduo.init: on de co de membres");
   
    if (this.commun.maStatToday) { this.maStatToday = this.commun.maStatToday; }
    this.recupsub = this.ar.paramMap.subscribe((params: any) => {
      this.monpseudo = params.get('pseudo');
      let idpartie = params.get('idpartie');
       //recup.unsubscribe();
      // 1/ de là on récupère les stat du pseudo : 
      this.statsub = this.crud.getStat(this.monpseudo).subscribe(data => {
        this.mesStat$ = data;
        this.maStatToday = data[0];
        this.commun.maStatToday = data[0];
      });
      //2/ on delete le doc  n-partie:
      let suppr = this.crud.getpartieById(idpartie).subscribe((data: any) => {
       if (!data|| data==undefined|| data=='null') {console.log('deja delete');}else{this.crud.deletePartie(idpartie);console.log('delete');}
      suppr.unsubscribe();
      });
       
      //3/ deco de bdd membres:
      this.crud.deco(this.monpseudo);

    });
  }
  //-----------
  statVis = false;
  stat() {
    this.statVis = true;
  }
  //---------
  nav() {
    this.router.navigate(["/"]);
  }
  //----------

ngOnDestroy(): void {
  console.log('finduo destroy');
  this.recupsub.unsubscribe();
  
}

}
