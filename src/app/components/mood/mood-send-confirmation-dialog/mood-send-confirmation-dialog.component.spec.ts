import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodSendConfirmationDialogComponent } from './mood-send-confirmation-dialog.component';

describe('MoodSendConfirmationDialogComponent', () => {
  let component: MoodSendConfirmationDialogComponent;
  let fixture: ComponentFixture<MoodSendConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodSendConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodSendConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
