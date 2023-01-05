import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodSnackBarComponent } from './mood-snack-bar.component';

describe('MoodSnackBarComponent', () => {
  let component: MoodSnackBarComponent;
  let fixture: ComponentFixture<MoodSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodSnackBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
