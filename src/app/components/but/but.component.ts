import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-but',
  templateUrl: './but.component.html',
  styleUrls: ['./but.component.scss']
})
export class ButComponent implements OnInit {

  constructor() { }
page:any;
  ngOnInit(): void {
    this.page=1;
  }

}
