import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsEditComponent } from './goals-edit.component';

describe('GoalsEditComponent', () => {
  let component: GoalsEditComponent;
  let fixture: ComponentFixture<GoalsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
