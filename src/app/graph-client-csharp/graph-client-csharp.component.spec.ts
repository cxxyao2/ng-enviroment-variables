import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphClientCsharpComponent } from './graph-client-csharp.component';

describe('GraphClientCsharpComponent', () => {
  let component: GraphClientCsharpComponent;
  let fixture: ComponentFixture<GraphClientCsharpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphClientCsharpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphClientCsharpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
