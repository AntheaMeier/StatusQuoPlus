import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalCompletedDialogComponent } from './goal-completed-dialog.component';

describe('GoalCompletedDialogComponent', () => {
  let component: GoalCompletedDialogComponent;
  let fixture: ComponentFixture<GoalCompletedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalCompletedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalCompletedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
