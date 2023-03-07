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

const Get_OneBook = gql`
  query ($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
      }
    }
  }
`;

const Get_BooksByAuthorId = gql`
  query ($authorId: ID!) {
    booksByAuthorId(authorId: $authorId) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

const AddBook = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
      author {
        name
      }
    }
  }
`;
@Component({
  selector: 'app-graph-readonly',
  templateUrl: './graph-readonly.component.html',
  styleUrls: ['./graph-readonly.component.css'],
})
export class GraphReadonlyComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: Get_Books,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        // this.allBooks = data.books;
        console.log('books changes in readonly component', data.books);
      });
  }
}
