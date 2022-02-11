import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalsEditComponent } from './goals-edit.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MockModule} from "ng-mocks";

describe('GoalsEditComponent', () => {
  let component: GoalsEditComponent;
  let fixture: ComponentFixture<GoalsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsEditComponent ],
      imports: [MockModule(MatDialogModule), MockModule(MatDialogRef)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //ng mocks

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
