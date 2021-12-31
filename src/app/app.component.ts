import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { gql, Apollo } from 'apollo-angular';
import { Book } from './models/book';
import { Author } from './models/author';
import { from, Observable, of } from 'rxjs';
import { concatMap, map, switchMap, take } from 'rxjs/operators';

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
  query ($authorId: ID) {
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: Get_Books,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.allBooks = data.books;
      });
  }

  getBooksByMultiBookId() {
    from(['61153c5abe20fe124a4354a8', '61ce36ea453f1708be60ed48'])
      .pipe(
        concatMap((bookId: string) => this.getBooksBySameWriter(bookId)),
        take(100)
      )
      .subscribe((data) => {
        console.log('multiUser BooksList is', data);
      });
  }

  getBooksBySameWriter(oneBookId: string) {
    return this.apollo
      .watchQuery<any>({
        query: Get_OneBook,
        variables: {
          id: oneBookId,
        },
      })
      .valueChanges.pipe(
        switchMap(({ data, loading }) => {
          if (data && data.book) {
            return this.apollo.watchQuery<any>({
              query: Get_BooksByAuthorId,
              variables: {
                authorId: data.book.author.id,
              },
            }).valueChanges;
          } else {
            return of(null);
          }
        }),
        take(1)
      );
    // .subscribe((result: any) => {
    //   if (result.data && result.data.booksByAuthorId)
    //     this.BooksByAuthors = result.data.booksByAuthorId;
    // });
  }

  searchBookById() {
    this.errorMessage = '';
    this.apollo
      .watchQuery<any>({
        query: Get_OneBook,
        variables: {
          id: this.bookId,
        },
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          console.log(loading);
          this.searchBook = data.book;

          if (this.searchBook) {
            this.allBooks = [];
            this.allBooks.push(this.searchBook);
          }
        },
        (err) => {
          this.errorMessage = err.toString();
        }
      );
  }

  addOneBook() {
    this.errorMessage = '';
    this.apollo
      .mutate({
        mutation: AddBook,
        variables: {
          name: this.bookName,
          genre: this.genre,
          authorId: this.authorId,
        },
      })

      .subscribe(
        ({ data }) => {
          const result: any = data;
          const newBook: Book = result.addBook;
          this.allBooks = [...this.allBooks, newBook];
        },
        (err) => {
          this.errorMessage = err.toString();
        }
      );
  }

  bookTrackBy(index: number, book: Book): string {
    return book.id;
  }

  getBooksByAuthorId(authorId?: string) {
    this.errorMessage = '';
    this.apollo
      .watchQuery<any>({
        query: Get_BooksByAuthorId,
        variables: {
          authorId: authorId,
        },
      })
      .valueChanges.subscribe(
        ({ data, loading }) => {
          console.log('book with author is', data);
          const result: any = data;
          const books: Book[] = result.booksByAuthorId;
          this.allBooks = [...books];
        },
        (err) => {
          this.errorMessage = err.toString();
        }
      );
  }
}
