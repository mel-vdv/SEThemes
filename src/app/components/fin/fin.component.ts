import { CrudservService } from './../../services/crudserv.service';
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
    private ar : ActivatedRoute ,
    private crud: CrudservService
  ) { }

  ngOnInit(): void {
    this.commun.enCours=false;
    
      this.ar.paramMap.subscribe((params: any) => {
     this.commun.idu = params.get('id'); 
    

     this.crud.getId(this.commun.idu).subscribe((data:any)=>{
    this.commun.totalSets = data.totalSets; 
    this.commun.record10s = data.record10s; 
    this.commun.record5s = data.record5s; 
    this.commun.record3m = data.record3m;
    this.commun.inscrD = data.inscrD; 
    this.commun.recordD = data.recordD; 
   });
 
  
   
  });
}
  nav(loc:string){
    this.router.navigate([`/${loc}`]);
  }
  statVis=false;
  stat(){
this.statVis=true;
  }

}
