import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoodEditComponent } from './mood-edit.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MockModule} from "ng-mocks";

describe('GoalsEditComponent', () => {
  let component: MoodEditComponent;
  let fixture: ComponentFixture<MoodEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodEditComponent ],
      imports: [MockModule(MatDialogModule), MockModule(MatDialogRef)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //ng mocks

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
