import { Component, OnInit } from '@angular/core';
import { EnvService } from '../env.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  homeUrl='not existed';
  constructor(private env: EnvService) {
    if (env.enableDebug) {
      console.log('Debug mode enabled');
    }
    if(env.apiUrl){
      this.homeUrl = env.apiUrl;
    }
  }

  ngOnInit(): void {}
}
