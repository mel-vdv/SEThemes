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
idpartie!:string;
maPartie:any;

jesuis= 'joueur1';

  ngOnInit(): void {
    this.ar.paramMap.subscribe((params: any) => {
      this.idpartie = params.get('id');
      // de là on récupère les info de la partie créée:
      this.crud.getPartieId(this.idpartie).subscribe((data: any) => {
        this.maPartie = data;
      });
    });
  } 
//-----------
statVis=false;
stat(){
this.statVis=true;
}
//---------
nav(loc:string){
  this.router.navigate(["/"]);
}
}
