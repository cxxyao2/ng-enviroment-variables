import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWithIdComponent } from './update-with-id.component';

describe('UpdateWithIdComponent', () => {
  let component: UpdateWithIdComponent;
  let fixture: ComponentFixture<UpdateWithIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWithIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWithIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
