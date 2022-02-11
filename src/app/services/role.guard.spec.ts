import { TestBed } from '@angular/core/testing';
import {MockModule} from "ng-mocks";
import { Router } from "@angular/router";
import { RoleGuard } from './role.guard';
import {MatDialogModule} from "@angular/material/dialog";

describe('RoleGuard', () => {
  let guard: RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(Router)]

    });
    guard = TestBed.inject(RoleGuard);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
