
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

  monpseudo?:string;
  idu!: string;
  maPartie?:any;
  

  niveau?: number;

  enCours?: boolean;
  timerOn?: boolean;
  theme?: string;
  mode?: string;
  timer?: number;

  cartes!: string[];
  douze?: any;
  score?: number;
  htmlMin!: string; htmlSec!: string;

  totalSets!: number; inscrD!: number;
  record10s?: number; record5s?: number; record3m?: number; recordD!: number;
  recordBattu?: boolean;

  recording?: boolean;


  ////////////////////////////////////////////////////////////////////////////----------------------------------------
  enregistrerPartie() {
    console.log(this.idu);
    this.crud.getId(this.idu).subscribe((data: any) => {
    
      this.totalSets = data.totalSets;
      this.record10s = data.record10s;
      this.record5s = data.record5s;
      this.record3m = data.record3m;
      this.inscrD = data.inscrD;
      this.recordD = data.recordD; 

    if (!this.recording) {

      switch (this.mode) {
        case '10sets':
          if (this.timer! < this.record10s! || this.record10s === 0) {
            console.log('record battu');
            this.recordBattu = true;
            this.recordD = Date.now();
            this.record10s = this.timer;
          }
          else {
            this.recordBattu = false;
          };


          break;
        case '5sets':
          if (this.timer! < this.record5s! || this.record5s === 0) {
            console.log('record battu');
            this.recordBattu = true;
            this.recordD = Date.now();
            this.record5s = this.timer;
          }
          else {
            this.recordBattu = false;
          }
          break;
        case '3min':
          if (this.score! > this.record3m! || this.record3m === 0) {
            console.log('record battu');
            this.recordBattu = true;
            this.recordD = Date.now();
            this.record3m = this.score;
          }
          else {
            this.recordBattu = false;
          }
          break;
        default: console.log('bibi');
      }
      //--------------
      let updatage:any = {
        'id': this.idu,
        'totalSets': this.totalSets + this.score!,
        'record10s': this.record10s,
        'record5s': this.record5s,
        'record3m': this.record3m,
        'recordD': this.recordD
      }
      this.crud.enregistrer(updatage);
      this.recording = true;
      return;
      
    }

    });
    //---------------------


  }
  ////////////////////////////////////////////////////////////////////////////-----------------------------------------
  tictac: any;
  lancerLeTimer() {
    this.htmlMin = '00';
    this.htmlSec = '00';
    this.timer = 0;
    this.timerOn = true;
    this.tictac = setInterval(() => { // !! fonction arrow et non fonction anonymous car 'this' !!

      if ((this.mode === '3min' && this.timer! < 180) || (this.mode === '10sets' && this.score! < 10) || (this.mode === '5sets' && this.score! < 5)) {
        this.timer!++;
        let min = Math.floor(this.timer! / 60);
        let sec = this.timer! - (min * 60);
        this.htmlMin = min < 10 ? '0' + min : min + '';
        this.htmlSec = sec < 10 ? '0' + sec : sec + '';
      }
      else {
        
        if (this.mode === '3min') { 
          clearInterval(this.tictac); this.timerOn = false;
          this.enregistrerPartie();
        this.router.navigate([`/fin/${this.idu}`]); }
      }
    }, 1000);

  }
  //----------------------------------------------

}
