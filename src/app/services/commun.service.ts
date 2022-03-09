import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunService {

  constructor(
    private router : Router
  ) { }
 enCours?:boolean;
 timerOn?:boolean;
  theme?:string;
  mode?:number;
  timer?:number;
  cartes!:string[];
  douze?:any;
  score?:number;
  htmlMin!: string; htmlSec!: string;
  lancerLeTimer() {
    this.htmlMin = '00';
    this.htmlSec = '00';
    this.timer = 0;
    this.timerOn = true;
    setInterval(() => { // !! fonction arrow et non focntion anonymous car 'this' !!
      if ((this.mode === 2 && this.timer! < 180) || (this.mode === 1 && this.score! < 10)) {
        this.timer!++;
        let min = Math.floor(this.timer! / 60);
        let sec = this.timer! - (min * 60);
        this.htmlMin = min < 10 ? '0' + min : min + '';
        this.htmlSec = sec < 10 ? '0' + sec : sec + '';
      }
      else {
        this.router.navigate(['/fin']);
      }
    }, 800);

  }
}
