import {Component} from '@angular/core';
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
export class GoalsCreateComponent {

  drop(event: CdkDragDrop<Goals[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }




  enteredValue = '';
  newPost = '';

  displayedColumns: string[] = ['description'];
  data: Goals[] = [];
  isLoadingResults = true;
  goal: Goals = { id: '', description: ''};


  description = '';
  constructor(public dialog: MatDialog, private router: Router, private api: ApiService, private route: ActivatedRoute) { }

  onAddPost(){
    /*console.log('enteredValue = ' + this.enteredValue);
    this.newPost = this.enteredValue;
    this.isLoadingResults = true;
    let addedGoal = "{ \"description:\" : "+ "\"" + this.newPost + "\""  + "}";
    console.log('addedGoal = ' + addedGoal);

    this.api.addArticle(addedGoal)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });*/


    this.isLoadingResults = true;
    const simpleObject = {} as Goals;
    simpleObject.description= this.enteredValue;

    this.api.addArticle(simpleObject)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });

    this.data.push(simpleObject);

  }

  onDeleteGoal(){
    this.newPost = this.enteredValue;
  }


  ngOnInit() {
    this.api.getArticles()
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data)
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

    this.getArticleDetails(this.route.snapshot.params.id);

  }

  getArticleDetails(id: any) {
    this.api.getArticle(id)
      .subscribe((data: any) => {
        this.goal = data;
        console.log(this.goal);
        this.isLoadingResults = false;
      });
  }

  deleteArticle(id: any) {
    this.isLoadingResults = true;
    this.api.deleteArticle(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/articles']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(GoalsEditComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  sendMessage() {
    // After Sending Message
    this.enteredValue = '';
  }
}





