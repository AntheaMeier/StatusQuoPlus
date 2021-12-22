import {Component, Input, OnInit} from '@angular/core';
import {Tasks} from "../shared/tasks";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Goals} from "../shared/goals";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../shared/api.service";
import {DeleteConfirmationDialogComponent} from "../goals/delete-confirmation-dialog/delete-confirmation-dialog";
import {DeleteTaskDialogComponent} from "./delete-task-dialog/delete-task-dialog.component";


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() tasksToOneGoal: Tasks[] = [];
  @Input() tasksToDoing: Tasks[] = [];
  @Input() tasksToDone: Tasks[] = [];
  @Input() goalid: string = '';


  task: Tasks = { goalid: '', _id: '', description: '', status: ''};
  description = '';
  isLoadingResults = true;
  status = '';
  editable= false;


  showData: boolean = false;

  @Input() selectedRole: String = "Mitarbeiter_in";


  constructor(public dialog: MatDialog, private router: Router, private api: ApiService, private route: ActivatedRoute,) { }

  ngOnInit(): void {

  }

  fillArrays() {
    for(let task of this.tasksToOneGoal) {
      if (task.status == "doing") {
        let index = this.tasksToOneGoal.indexOf(task);
        this.tasksToOneGoal.splice(index,1);
        this.tasksToDoing.push(task);
      } else if(task.status == "done") {
        let index = this.tasksToOneGoal.indexOf(task);
        this.tasksToOneGoal.splice(index,1);
        this.tasksToDone.push(task);
      }
    }
    this.ngOnInit();
  }




  /*TODO*/

  public changeStatusToTodo(): void {
    this.tasksToOneGoal.forEach((task: Tasks) => {
      if(task.status != 'todo') {
        console.log(task._id);
        task.status = String('todo');
        this.api.updateTaskStatus(task._id, task).subscribe((task: Tasks) => {
        }, error => {
          console.log('hat nicht funktioniert');
        });
      }
    });
  }


  dropInTodo(event: CdkDragDrop<any>) {
    console.log('vorher ' + this.tasksToOneGoal);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('moveIteminArray aufgerufen');
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log('nachher ' + this.tasksToOneGoal);
      this.changeStatusToTodo();
    }
  }




  /*DOING*/

  public changeStatusToDoing(): void {
    console.log('changeStatustoDoing augerufen')
    this.tasksToDoing.forEach((task: Tasks) => {
      if(task.status != 'doing') {
        console.log(task._id);
        task.status = String('doing');
        this.api.updateTaskStatus(task._id, task).subscribe((task: Tasks) => {
        }, error => {
          console.log('hat nicht funktioniert');
        });
      }
    });
  }


  dropInDoing(event: CdkDragDrop<any>) {
    console.log('vorher ' + this.tasksToOneGoal);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('moveIteminArray aufgerufen');
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log('nachher ' + this.tasksToOneGoal);
      this.changeStatusToDoing();
    }
  }





  /*DONE*/

  public changeStatusToDone(): void {
    this.tasksToDone.forEach((task: Tasks) => {
      if(task.status != 'done') {
        console.log(task._id);
        task.status = String('done');
        this.api.updateTaskStatus(task._id, task).subscribe((task: Tasks) => {
        }, error => {
          console.log('hat nicht funktioniert');
        });
      }
    });
  }


  dropInDone(event: CdkDragDrop<any>) {
    console.log('vorher ' + this.tasksToOneGoal);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('moveIteminArray aufgerufen');
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log('nachher ' + this.tasksToOneGoal);
      this.changeStatusToDone();
    }
  }




  addTask(){
    this.isLoadingResults = true;
    const simpleObject = {} as Tasks;
    simpleObject.description = "Click to edit";
    simpleObject.status= "todo";
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

    let idDialog= id;
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      width: '40%',
      data :{'_id': idDialog }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });


  }



  changeEditable(){
    if(this.selectedRole=='Mitarbeiter_in') {
      this.editable = true;
    }
  }


  getTheInput(e: any) {
    this.description = e.target.value;
  }



  updateATask(task: Tasks){
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
    this.editable= false;
  }


}
