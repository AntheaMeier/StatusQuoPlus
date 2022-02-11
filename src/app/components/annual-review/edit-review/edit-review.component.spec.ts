import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditReviewComponent } from './edit-review.component';
import {MockModule} from "ng-mocks";
import {MatDialogModule} from "@angular/material/dialog";

describe('EditReviewComponent', () => {
  let component: EditReviewComponent;
  let fixture: ComponentFixture<EditReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReviewComponent ],
      imports: [MockModule(MatDialogModule)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
