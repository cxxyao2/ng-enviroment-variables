import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { gql, Apollo } from 'apollo-angular';
import { Book } from '../models/book';
import { Author } from '../models/author';
import { from, Observable, of } from 'rxjs';
import { concatAll, concatMap, map, switchMap, take } from 'rxjs/operators';


const Get_Books = gql`
  query {
    books {
      id
      name
      genre
    }
  }
`;

@Component({
  selector: 'app-update-with-id',
  templateUrl: './update-with-id.component.html',
  styleUrls: ['./update-with-id.component.css'],
})
export class UpdateWithIdComponent implements OnInit {
  specificId: string = '';
  userName = 'Use is Home?';
  title = 'environment variable & graphQL';
  allBooks: Book[] = [];
  searchBook?: Book;
  bookId = '';
  bookName?: string;
  genre?: string;
  authorId?: string;
  BooksByAuthors: Book[] = [];
  errorMessage = '';

  

  constructor() {}

  ngOnInit(): void {}

  updateItemById(): void {
    console.log('updateItemById()');
  }

  removeItemById(): void {
    console.log('updateItemById()');
  }
}
