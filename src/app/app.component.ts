import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { gql, Apollo } from 'apollo-angular';
import { Book } from './models/book';
import { Author } from './models/author';

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
    }
  }
`;

const AddBook = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      author {
        name
      }
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  userName = 'Use is Home?';
  title = 'environment variable & graphQL';
  allBooks: Book[] = [];
  searchBook?: Book;
  bookId = '60fb61b6d5b7b184eb38204a';

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: Get_Books,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(loading);
        //console.log(data);
        this.allBooks = data.books;
      });
  }

  searchBookById() {
    console.log('clike me ');
    this.apollo
      .watchQuery<any>({
        query: Get_OneBook,
        variables: {
          id: this.bookId,
        },
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(loading);
        this.searchBook = data.book;
        console.log('book', this.searchBook);
        if (this.searchBook) {
          this.allBooks = [];
          this.allBooks.push(this.searchBook);
        }
      });
  }

  addOneBook() {
    this.apollo
      .mutate({
        mutation: AddBook,
        variables: {
          name: 'harry10',
          genre: 'fantacy',
          authorId: '60fb5ea016313d8298f0799c',
        },
      })
      .subscribe(({ data }) => {
        console.log('add a book', data);
      });
  }
}
