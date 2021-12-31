import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userName = 'Use is Home?';
  title = 'environment variable & graphQL';


  constructor() {}

  ngOnInit(): void {
  }}
