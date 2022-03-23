import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenue',
  templateUrl: './bienvenue.component.html',
  styleUrls: ['./bienvenue.component.scss']
})
export class BienvenueComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
  }
click(choix:any){
  setTimeout(()=>{
this.router.navigate([`/${choix}`]);
  }, 600);
}
}
