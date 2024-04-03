import { Component, OnInit } from '@angular/core';
import { of, Observable, pipe, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

const fromTimestamp = (): Observable<number> =>
{
   const timestamp = Date.now();
  return new Observable((subscriber) => {

    subscriber.next(timestamp);
  });
};

@Component({
  selector: 'app-unicast-multicast',
  templateUrl: './unicast-multicast.component.html',
  styleUrls: ['./unicast-multicast.component.css'],
})
export class UnicastMulticastComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const obs$ = fromTimestamp();
    obs$.subscribe((value) => console.log(`1st subscriber: ${value}`));
    obs$.subscribe((value) => console.log(`2nd subscriber: ${value}`));
  }
}
