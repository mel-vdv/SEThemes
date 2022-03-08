import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunService {

  constructor() { }

  theme?:string;
  mode?:string;
  timer?:number;
}
