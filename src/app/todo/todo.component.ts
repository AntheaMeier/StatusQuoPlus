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

  public changeStatus(): void {
    this.tasksToDoing.forEach((task: Tasks) => {
      console.log(task);
      task.status = String('doing');
      this.api.updateTaskStatus(task, task).subscribe((task: Tasks) => {
      }, error => {
        console.log('hat nicht funktioniert');
      });
    });
  }


  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      console.log('transferArrayItem aufgerufen');
      this.changeStatus();
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
    this.editable = true;
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
