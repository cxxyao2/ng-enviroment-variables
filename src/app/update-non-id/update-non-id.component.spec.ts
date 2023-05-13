import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNonIdComponent } from './update-non-id.component';

describe('UpdateNonIdComponent', () => {
  let component: UpdateNonIdComponent;
  let fixture: ComponentFixture<UpdateNonIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateNonIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNonIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
