import {Component, Inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GoalsCreateComponent} from "../../goals/goals-create/goals-create.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {DateAdapter} from "@angular/material/core";
import {Mood} from "../../../models/mood";

@Component({
  selector: 'app-mood-edit',
  templateUrl: './mood-edit.component.html',
  styleUrls: ['./mood-edit.component.css']
})
export class MoodEditComponent {

  mood?: Mood;

  @Input() idDialog: any;
  enteredValue = "";
  oldDescription: any;
  id = '';
  isLoadingResults = false;
  enteredExpiryDate?: Date;
  placeholderExpiryDate = 'Fälligkeitsdatum festlegen';

  articleForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value')
  });

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<GoalsCreateComponent>,
              private router: Router, private route: ActivatedRoute,
              private api: ApiService, private formBuilder: FormBuilder,
              private dateAdapter: DateAdapter<Date>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dateAdapter.setLocale('de');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onFormSubmit() {
    let removeExpiryDate = false;
    this.isLoadingResults = true;
    this.data.description = this.enteredValue;
    if(this.enteredExpiryDate) {
      this.data.expiry_date = this.enteredExpiryDate;
    } else {
      this.data.expiry_date = '';
      removeExpiryDate = true;
    }
    this.api.updateGoal(this.data.id, this.data, removeExpiryDate)
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
