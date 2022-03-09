import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunService {

  constructor() { }
 enCours?:boolean;
 timerOn?:boolean;
  theme?:string;
  mode?:number;
  timer?:number;
  cartes!:string[];
  douze?:any;
  score?:number;
}
