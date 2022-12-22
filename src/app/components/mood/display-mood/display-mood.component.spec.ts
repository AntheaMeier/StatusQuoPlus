import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMoodComponent } from './display-mood.component';

describe('DisplayMoodComponent', () => {
  let component: DisplayMoodComponent;
  let fixture: ComponentFixture<DisplayMoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
