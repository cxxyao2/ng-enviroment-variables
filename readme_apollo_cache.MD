# directly update cached data

import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { Book } from '../models/book';
import { from, Observable, of, Subscription } from 'rxjs';
import { concatAll, concatMap, map, switchMap, take } from 'rxjs/operators';
import { ApolloUtilService } from '../apollo-util.service';

const GET_BOOKS = gql`  query {
    books {
      id
      name
      genre
    }
  }`;

const Get_ONE_BOOK = gql`  query GetOneBook($id: ID) {
    book(id: $id) {
      id
      name
      genre
    }
  }`;

@Component({
selector: 'app-record-with-ref',
templateUrl: './record-with-ref.component.html',
styleUrls: ['./record-with-ref.component.css'],
})
export class RecordWithRefComponent implements OnInit, OnDestroy {
fields = ['name']; // Set fields array
allBooks = signal<Book[]>([]);
targetId = '';
private querySubscription?: Subscription;

constructor(
private apollo: Apollo,
private apolloUtilService: ApolloUtilService
) {}

ngOnInit(): void {
this.querySubscription = this.apollo
.watchQuery<any>({
query: GET_BOOKS,
})
.valueChanges.subscribe(({ data, loading }) => {
this.allBooks.set(data.books);
console.log('allBooks: ', this.allBooks());
});
}

ReadLocalById(): void {
// 其他方式: 筛选出 id 相同的记录
// must watchQuery first , which fetches data from remote server, then readQuery from local cache
const result = this.apollo.client.readQuery({
query: Get_ONE_BOOK,
variables: {
id: this.targetId,
},
});

    console.log('result: ', (result as any).book);

}

fetchById(): void {
// get data by id from local cache
this.apollo
.watchQuery<any>({
query: Get_ONE_BOOK,
variables: {
id: this.targetId,
},
})
.valueChanges.pipe(take(1))
.subscribe(({ data, loading }) => {
console.log('id', this.targetId);
console.log('result: ', data.book);
});
}

writeQueryById3(): void {
let objName = 'Book';
const data = {
name: 'grapes 🍇 delicious',
};
const fields = Object.keys(data)
.map((field) => `${field}`)
.join('\n');

    // MyObject is a fragment name, which can be any name,but should be constant
    const aQl = gql`
      fragment MyObject on ${objName} {
       ${fields}
      }
    `;
    this.apollo.client.writeFragment({
      id: 'Book:' + this.targetId,
      fragment: aQl,
      data: data,
    });

}

writeQueryById2(): void {
// succeeded. upated a segment of an object
this.apollo.client.writeFragment({
id: 'Book:' + this.targetId,
fragment: gql`        fragment MyBook on Book {
          name
        }
     `,
data: {
name: 'grapes 🍇 delicious',
},
});
}

writeQueryById(): void {
// succeeded. updated local cache directly by id without updating remote server.
// 1，不需要事先获取 2,更新本地,所有用 Books 对象的自动刷新 3,不更新远程
// 缺点: 指定字段名，不灵活
this.apollo.client.writeQuery({
query: gql`        query WriteBook($id: ID) {
          book(id: $id) {
            id
            name
            genre
          }
        }
     `,
data: {
// Contains the data to write
book: {
\_\_typename: 'Book',
id: this.targetId,
name: 'Buy grapes 🍇',
genre: 'happy fruit',
},
},
variables: {
id: this.targetId,
},
});
}

removeRecordById(): void {
// todo
}

ngOnDestroy() {
this.querySubscription?.unsubscribe();
}

generateFragment(objectType: string) {
// Generate fragment with fields array
const fields = this.fields.map((field) => `${field}`).join('\n');
return gql`      fragment ${objectType}Fields on ${objectType} {
        ${fields}
      }
   `;
}
}
