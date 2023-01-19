import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpLockDialogComponent } from './help-lock-dialog.component';

describe('HelpLockDialogComponent', () => {
  let component: HelpLockDialogComponent;
  let fixture: ComponentFixture<HelpLockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpLockDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpLockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
