import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tasks} from "../shared/tasks";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {ApiService} from "../services/api.service";
import {DeleteTaskDialogComponent} from "./delete-task-dialog/delete-task-dialog.component";
import {Goals} from "../shared/goals";

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
  selectedTask: Tasks = {_id: '', description: '', status: '', goalid: ''};
  description = '';
  isLoadingResults = true;
  status = '';
  editable = false;
  editableId: String = '';
  readOnly = true;
  placeholder = "Benenne deine Task...";
  showTaskid = '';
  showTasksToOneGoal = false;

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

  addTask() {
    this.isLoadingResults = true;
    const simpleObject = {} as Tasks;
    simpleObject.description = this.placeholder;
    simpleObject.status = "todo";
    simpleObject.goalid = this.goalid;

    this.api.addTask(simpleObject)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
    window.location.reload()
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
  }

  setTasksid(value: string) {
    this.showTaskid = value;
  }

  setTheSelectedTask(task: Tasks) {
    this.selectedTask = task;
    this.editableId = task._id;
  }

  showTasks(id: any) {
    this.api.getTasksToGoal(id)
      .subscribe((res: any) => {
        this.tasksToOneGoal = res;
        this.showTasksClicked.emit(this.tasksToOneGoal);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.showTasksToOneGoal = true;


    //TODO
    this.api.getTasksToStatus(id, 'todo')
      .subscribe((res: any) => {
        this.tasksToTodo = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

    //DOING
    this.api.getTasksToStatus(id, 'doing')
      .subscribe((res: any) => {
        this.tasksToDoing = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

    //DONE
    this.api.getTasksToStatus(id, 'done')
      .subscribe((res: any) => {
        this.tasksToDone = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

  }

/*  edit () {
    return {
      restrict: 'E',
      scope: {
        value: '='
      },
      link: function ($scope: any, element: any) {
        let inputElement = element(element.children()[1]);
        element.addClass('edit-in-place');
        $scope.editing = false;
        $scope.edit = function () {
          $scope.editing = true;
          element.addClass('active');
          inputElement[0].focus();
        }; /!*inputElement.prop('onblur', function() {
          $scope.editing = false;
          element.removeClass('active');
        });*!/
      }
    };
  }*/
}
