import { Component, OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'app-mouse-move',
  templateUrl: './mouse-move.component.html',
  styleUrls: ['./mouse-move.component.css']
})
export class MouseMoveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('document:mousemove',['$event'])
  onMouseMove(e:any){
    console.log(e);
  }

}
