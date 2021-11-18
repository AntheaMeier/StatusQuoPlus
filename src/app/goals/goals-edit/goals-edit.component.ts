import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GoalsCreateComponent} from "../goals-create/goals-create.component";
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */


@Component({
  selector: 'app-goals-edit',
  templateUrl: './goals-edit.component.html',
  styleUrls: ['./goals-edit.component.css'],
})
export class GoalsEditComponent implements OnInit {

 @Input() idDialog: any;
 enteredValue = "";
 oldDescription: any;

  articleForm: FormGroup =  this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });
  id = '';
  isLoadingResults = false;


  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<GoalsCreateComponent>,
              private router: Router, private route: ActivatedRoute,
              private api: ApiService, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(GoalsEditComponent, {
      width: '40%',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    console.log(this.data);
  }

  ngOnInit() {
    this.getGoal(this.data.id);
    this.articleForm = this.formBuilder.group({
      'description' : ['', Validators.required]
    });

  }

  getGoal(id: any) {
    this.api.getGoal(id).subscribe((data: any) => {
      this.id = data.id;
      this.oldDescription = data.description;
      this.articleForm.setValue({
        description: data.description,
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    console.log(this.data);
    this.data.description = this.enteredValue;
    this.api.updateGoal(this.data.id, this.data)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
    this.dialogRef.close();
  }
}
