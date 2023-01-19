import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodConfirmationDialogComponent } from './mood-confirmation-dialog.component';

describe('MoodConfirmationDialogComponent', () => {
  let component: MoodConfirmationDialogComponent;
  let fixture: ComponentFixture<MoodConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
