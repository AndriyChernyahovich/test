import {Component, OnInit} from '@angular/core';
import {ICarOwnersService} from "./service/service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  constructor() {
  }
  ngOnInit() {
  }
}
