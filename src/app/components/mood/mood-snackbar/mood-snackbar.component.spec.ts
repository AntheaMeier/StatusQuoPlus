import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodSnackbarComponent } from './mood-snackbar.component';

describe('MoodSnackbarComponent', () => {
  let component: MoodSnackbarComponent;
  let fixture: ComponentFixture<MoodSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
