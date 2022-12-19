import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendConfirmationDialogComponent } from './send-confirmation-dialog.component';

describe('SendConfirmationDialogComponent', () => {
  let component: SendConfirmationDialogComponent;
  let fixture: ComponentFixture<SendConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendConfirmationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
