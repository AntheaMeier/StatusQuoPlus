import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualReviewComponent } from './annual-review.component';
import {MockModule} from "ng-mocks";
import {HttpClient} from "@angular/common/http";

describe('AnnualReviewComponent', () => {
  let component: AnnualReviewComponent;
  let fixture: ComponentFixture<AnnualReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualReviewComponent ],
      imports: [MockModule(HttpClient)]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
