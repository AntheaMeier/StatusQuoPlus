import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodTrackenComponent } from './mood-tracken.component';

describe('MoodTrackenComponent', () => {
  let component: MoodTrackenComponent;
  let fixture: ComponentFixture<MoodTrackenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodTrackenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodTrackenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


