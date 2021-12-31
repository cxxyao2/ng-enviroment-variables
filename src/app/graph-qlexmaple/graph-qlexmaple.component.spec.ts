import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphQLExmapleComponent } from './graph-qlexmaple.component';

describe('GraphQLExmapleComponent', () => {
  let component: GraphQLExmapleComponent;
  let fixture: ComponentFixture<GraphQLExmapleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphQLExmapleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphQLExmapleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
