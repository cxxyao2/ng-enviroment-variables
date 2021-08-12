import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor() {}

  getBook(): Observable<Book> {
    const xx: Book = { id: 'xxx', name: 'xxx', genre: 'xx' };
    // return of(xx);
    return of({ id: 'xxx', name: 'xxx', genre: 'xx', age: 12 }); // 如果返回的property比要求的多,ok;如果少,error
  }
}
