import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodTrackerStatistikComponent } from './mood-tracker-statistik.component';

describe('MoodTrackerStatistikComponent', () => {
  let component: MoodTrackerStatistikComponent;
  let fixture: ComponentFixture<MoodTrackerStatistikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodTrackerStatistikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodTrackerStatistikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
