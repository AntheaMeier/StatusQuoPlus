import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamviewComponent } from './teamview.component';
import {MockModule} from "ng-mocks";
import {MatDialogModule} from "@angular/material/dialog";
import {Router} from "@angular/router";

describe('TeamviewComponent', () => {
  let component: TeamviewComponent;
  let fixture: ComponentFixture<TeamviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamviewComponent ],
      imports: [MockModule(Router)]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
