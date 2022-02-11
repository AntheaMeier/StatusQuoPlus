import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDialog} from "@angular/material/dialog";
import { GoalsCreateComponent } from './goals-create.component';
import {MockModule} from "ng-mocks";
import {Router} from "@angular/router";

describe('GoalsComponent', () => {
  let component: GoalsCreateComponent;
  let fixture: ComponentFixture<GoalsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsCreateComponent ],
      imports: [MockModule(MatDialog)]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
