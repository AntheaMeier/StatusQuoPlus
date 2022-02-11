import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MockModule} from "ng-mocks";
import { TodoEditComponent } from './todo-edit.component';
import {MatDialogModule} from "@angular/material/dialog";

describe('TodoEditComponent', () => {
  let component: TodoEditComponent;
  let fixture: ComponentFixture<TodoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoEditComponent ],
      imports: [MockModule(MatDialogModule)]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
