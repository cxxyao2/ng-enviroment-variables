import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';


const Get_Books = gql`
  query {
    books {
      id
      name
      genre
    }
  }
`;

const Get_Courses = gql`
  query {
    allCourses{
          id
          name
          instructorMember
          {
            id
          }
        }
  }
`;



@Component({
  selector: 'app-graph-client-csharp',
  templateUrl: './graph-client-csharp.component.html',
  styleUrls: ['./graph-client-csharp.component.css'],
})
export class GraphClientCsharpComponent implements OnInit {
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: Get_Courses,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(data);
      });
  }
}
