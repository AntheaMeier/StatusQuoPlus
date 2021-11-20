import {Component, Input, OnInit} from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Goals} from "../../shared/goals";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {ActivatedRoute, Router} from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {GoalsEditComponent} from "../goals-edit/goals-edit.component";
/** Error when invalid control is dirty, touched, or submitted. */


@Component({
  selector: 'app-goals',
  templateUrl: './goals-create.component.html',
  styleUrls: ['./goals-create.component.css']
})
export class GoalsCreateComponent implements OnInit{
  enteredValue = '';
  newPost = '';
  idDialog: any = '';

  displayedColumns: string[] = ['description'];
  data: Goals[] = [];
  isLoadingResults = true;
  goal: Goals = { id: '', description: '', order: ''};
  description = '';
  id = '';


  constructor(public dialog: MatDialog, private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  public position(): void {
    console.log('position aufgerufen');
    let position = 0;
    this.data.forEach((goal: Goals) => {
      position +=1;
      goal.order = String(position);
      this.api.updateGoalOrder(goal.id, goal).subscribe((data: Goals) => {
        console.log('neu positioniert');
        }, error => {
        console.log('hat nicht funktioniert');
      });
    });
  }

  drop(event: CdkDragDrop<Goals[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('bewegt oder?');
      this.position();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  onAddPost(){
    this.isLoadingResults = true;
    const simpleObject = {} as Goals;
    simpleObject.description = this.enteredValue;

    this.api.addGoal(simpleObject)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;

      });

    window.location.reload()
  }


  onDeleteGoal(){
    this.newPost = this.enteredValue;
  }


  ngOnInit() {
    this.api.getGoals()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data)
        console.log(this.data);
        this.isLoadingResults = false;

        this.data.sort((goal1, goal2) => {
          return Number(goal1.order)- Number(goal2.order);
        });
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  getGoalDetails(id: any) {
    this.api.getGoal(id)
      .subscribe((data: any) => {
        this.goal = data;
        console.log(this.goal);
        this.isLoadingResults = false;
      });

  }

  deleteGoal(id: any) {
    if(confirm("Are you sure you want to delete this goal?")) {
      this.isLoadingResults = true;
      this.api.deleteGoal(id)
        .subscribe(res => {
            this.isLoadingResults = false;
            this.router.navigate(['/articles']);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
      window.location.reload()

    }
  }

  openDialog(id: any): void {
    this.idDialog= id;
    const dialogRef = this.dialog.open(GoalsEditComponent, {
      width: '40%',
      data :{'id': this.idDialog, 'description': this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });


  }

  sendMessage() {
    // After Sending Message
    this.enteredValue = '';
  }

}





