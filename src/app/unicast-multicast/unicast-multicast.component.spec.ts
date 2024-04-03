import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnicastMulticastComponent } from './unicast-multicast.component';

describe('UnicastMulticastComponent', () => {
  let component: UnicastMulticastComponent;
  let fixture: ComponentFixture<UnicastMulticastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnicastMulticastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnicastMulticastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
