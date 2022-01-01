import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-mouse-move',
  templateUrl: './mouse-move.component.html',
  styleUrls: ['./mouse-move.component.css'],
})
export class MouseMoveComponent implements OnInit {
  @ViewChild('leftChild') leftDiv!: ElementRef;
  @ViewChild('rightChild') rightDiv!: ElementRef;

  canResizing = false;
  initX = 0;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.canResizing) return;
    let diff = e.clientX - this.initX;
    this.initX = e.clientX;
    let leftChildWidth = this.leftDiv.nativeElement.offsetWidth + diff;
    let rightChildWidth = this.rightDiv.nativeElement.offsetWidth - diff;
    this.leftDiv.nativeElement.style.width = leftChildWidth + 'px';
    this.rightDiv.nativeElement.style.width = rightChildWidth + 'px';
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    // console.log(e);
    this.canResizing = false;
  }

  onMouseDown(e: MouseEvent) {
    this.canResizing = true;
    this.initX = e.clientX;
  }
}
