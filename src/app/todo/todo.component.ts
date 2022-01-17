import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tasks} from "../shared/tasks";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {DeleteTaskDialogComponent} from "./delete-task-dialog/delete-task-dialog.component";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  @Input() tasksToOneGoal: Tasks[] = [];
  @Input() tasksToTodo: Tasks[] = [];
  @Input() tasksToDoing: Tasks[] = [];
  @Input() tasksToDone: Tasks[] = [];
  @Input() goalid: string = '';
  @Input() selectedRole: String = "Mitarbeiter_in";

  @Output() showTasksClicked = new EventEmitter<Tasks[]>();

  task: Tasks = {goalid: '', _id: '', description: '', status: ''};
  description = '';
  isLoadingResults = true;
  status = '';
  _id = '';
  editable = false;
  readOnly = true;
  placeholder = "Benenne deine Task...";
  value = 'Clear me';

  constructor(public dialog: MatDialog,
              private router: Router,
              private api: ApiService,
  ) {
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
    if(this.selectedRole == 'Mitarbeiter_in') {
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
    if(this.selectedRole == 'Mitarbeiter_in') {
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
    if(this.selectedRole == 'Mitarbeiter_in') {
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

  addTask(id: any) {
    if (this.selectedRole == 'Mitarbeiter_in') {
      this.isLoadingResults = true;
      const simpleObject = {} as Tasks;
      simpleObject.description = this.placeholder;
      simpleObject.status = "todo";
      simpleObject.goalid = id;
      this.api.addTask(simpleObject)
        .subscribe((res: any) => {
          this.isLoadingResults = false;
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
      window.location.reload()
    }
  }

  deleteDialog(id: any): void {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '40%',
      data: {'_id': id}
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getTheInput(e: any) {
      this.description = e.target.value;
  }

  updateATask(task: Tasks) {
    console.log(task)
    this.isLoadingResults = true;
    task.description = this.description;
    this.api.updateTask(task._id, task)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
    this.editable = false;
    window.location.reload()
  }

  changeEditable(){
    if(this.selectedRole=='Mitarbeiter_in') {
      this.editable = true;
    }
  }
}
