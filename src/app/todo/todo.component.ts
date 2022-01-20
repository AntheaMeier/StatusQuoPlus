import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tasks} from "../shared/tasks";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Login} from "../shared/login";
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DeleteTaskDialogComponent} from "./delete-task-dialog/delete-task-dialog.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() tasksToOneGoal: Tasks[] = [];
  @Input() tasksToTodo: Tasks[] = [];
  @Input() tasksToDoing: Tasks[] = [];
  @Input() tasksToDone: Tasks[] = [];
  @Input() goalid: string = '';
  @Input() selectedRole: String = "Mitarbeiter_in";
  @Input() currentUrl = "";
  @Input() idTeamMember = "";

  @Output() showTasksClicked = new EventEmitter<Tasks[]>();

  task: Tasks = {goalid: '', _id: '', description: '', status: ''};
  description = '';
  isLoadingResults = true;
  status = '';
  _id = '';
  editable = false;
  readOnly = true;
  value = 'Clear me'
  idloggedInUser: String = "";
  dataUsers: Login[] = [];
  showTasksToOneUser = false;
  idDialog: any = '';
  edit = false;
  addPost = false;
  enteredContent = "";

  todoForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });

  constructor(public dialog: MatDialog,
              private router: Router,
              private api: ApiService,
              private auth: AuthService,
              private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.api.getUsers()
      .subscribe((res: any) => {
        this.dataUsers = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.idloggedInUser = this.auth.getUserDetails().user_info._id;
    if (this.selectedRole != "Vorgesetzte_r") {
      this.getTodoDetails(this.idloggedInUser);
    }

    if (this.selectedRole == "Vorgesetzte_r") {
      this.getTodoDetails(this.idTeamMember);
      console.log('id member ' + this.idTeamMember);
    }
  }

  getTodoDetails(id: any) {
    this.api.getTasksToGoal(id)
      .subscribe((data: any) => {
        this.tasksToOneGoal = data;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.showTasksToOneUser = true;

  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  addTask(id: any) {
    if (this.selectedRole == 'Mitarbeiter_in') {
      this.isLoadingResults = true;
      const simpleObject = {} as Tasks;
      simpleObject.description = this.enteredContent;
      simpleObject.status = "todo";
      simpleObject.goalid = id;
      this.api.addTask(simpleObject)
        .subscribe((res: any) => {
          this.isLoadingResults = false;
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
      this.reloadCurrentRoute();
      this.addPost = false;
    }
  }

  addPostForm() {
    this.addPost = !this.addPost;
  }

  onFormSubmit(id: any) {
    this.isLoadingResults = true;
    this.api.updateTask(id, this.todoForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          console.log(id)
          this.isLoadingResults = false;
          // this.router.navigate(['/show-todo', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  deleteDialog(id: any): void {
    console.log(id)
    this.idDialog = id;
    this.dialog.open(DeleteTaskDialogComponent, {
      width: '40%',
      data: {'id': this.idDialog}
    });
  }

  editOnOff() {
    this.edit = !this.edit;
  }

// TODO

  changeStatusToTodo(): void {
    this.tasksToTodo.forEach((task: Tasks) => {
      if (task.status != 'todo') {
        task.status = String('todo');
        this.api.updateTaskStatus(task._id, task).subscribe((task: Tasks) => {
        })
      }
    });
  }

  dropInTodo(event: CdkDragDrop<any>) {
    if (this.selectedRole == 'Mitarbeiter_in') {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        this.changeStatusToTodo();
      }
    }
  }

  // DOING

  changeStatusToDoing(): void {
    this.tasksToDoing.forEach((task: Tasks) => {
      if (task.status != 'doing') {
        task.status = String('doing');
        this.api.updateTaskStatus(task._id, task).subscribe((task: Tasks) => {
        })
      }
    });
  }

  dropInDoing(event: CdkDragDrop<any>) {
    if (this.selectedRole == 'Mitarbeiter_in') {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        this.changeStatusToDoing();
      }
    }
  }


  // DONE
  public changeStatusToDone(): void {
    this.tasksToDone.forEach((task: Tasks) => {
      if (task.status != 'done') {
        task.status = String('done');
        this.api.updateTaskStatus(task._id, task).subscribe((task: Tasks) => {
        })
      }
    });
  }

  dropInDone(event: CdkDragDrop<any>) {
    if (this.selectedRole == 'Mitarbeiter_in') {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        this.changeStatusToDone();
      }
    }
  }
}

