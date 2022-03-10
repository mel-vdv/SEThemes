import { CrudservService } from './crudserv.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunService {

  constructor(
    private router: Router,
    public crud: CrudservService
  ) { }
   idu?:string;

  enCours?: boolean;
  timerOn?: boolean;
  theme?: string;
  mode?: number;
  timer?: number;
  cartes!: string[];
  douze?: any;
  score?: number;
  htmlMin!: string; htmlSec!: string;

  totalSets!: number; inscrD!: number;
  sets?: number; secs?: number; recordD!:number;


  //----------------------------------------
  enregistrerPartie(mode:number) {
    let temps;  let nb;
    if (mode === 1) {
      if (this.secs! === 0 || this.secs! > this.timer!) { 
        this.recordD= Date.now();
        
        temps = this.timer; nb = this.sets;
       }
      else {
        temps = this.secs;nb = this.sets;
      }
    }
    else {  // si mode 2 :
      if (this.sets! === 0 || this.sets! < this.score!) { nb = this.score; this.recordD= Date.now(); temps = this.secs; }
      else {
        nb = this.sets;temps = this.secs;
      }
    }
    let updatage = {
      id: this.idu,
      totalSets: this.totalSets + this.score!,
      sets: nb,
      secs: temps,
      recordD: this.recordD
    }

    this.crud.enregistrer(updatage);
    
  }
  //-----------------------------------------
  tictac:any;
  lancerLeTimer() {
    this.htmlMin = '00';
    this.htmlSec = '00';
    this.timer = 0;
    this.timerOn = true;
    this.tictac = setInterval(() => { // !! fonction arrow et non focntion anonymous car 'this' !!
      if ((this.mode === 2 && this.timer! < 60) || (this.mode === 1 && this.score! < 10)) {
        this.timer!++;
        let min = Math.floor(this.timer! / 60);
        let sec = this.timer! - (min * 60);
        this.htmlMin = min < 10 ? '0' + min : min + '';
        this.htmlSec = sec < 10 ? '0' + sec : sec + '';
      }
      else {
        clearInterval(this.tictac); this.timerOn = false;
        this.enregistrerPartie(2);
        this.router.navigate(['/fin']);
      }
    }, 800);

  }
  //----------------------------------------------

}
