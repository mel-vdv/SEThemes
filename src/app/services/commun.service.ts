import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommunService {

  constructor() { }

  compThemeVis?:boolean;
  theme?:string;
}
