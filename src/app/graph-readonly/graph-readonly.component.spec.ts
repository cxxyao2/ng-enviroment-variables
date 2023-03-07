import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphReadonlyComponent } from './graph-readonly.component';

describe('GraphReadonlyComponent', () => {
  let component: GraphReadonlyComponent;
  let fixture: ComponentFixture<GraphReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphReadonlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
