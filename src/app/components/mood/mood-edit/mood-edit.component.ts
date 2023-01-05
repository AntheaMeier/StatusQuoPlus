import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DisplayMoodComponent} from "../display-mood/display-mood.component";
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-mood-edit',
  templateUrl: './mood-edit.component.html',
  styleUrls: ['./mood-edit.component.css'],
})
export class MoodEditComponent implements OnInit {

  @Input() idDialog: any;
  enteredValue = "";
  oldDescription: any;
  id = '';
  isLoadingResults = false;
  storedDate?: Date;
  
  articleForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DisplayMoodComponent>,
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
    this.getMood(this.data.id);
    this.articleForm = this.formBuilder.group({
      'description': ['', Validators.required]
    });
  }

  getMood(id: any) {
    this.api.getGoal(id).subscribe((data: any) => {
      this.id = data.id;
      this.storedDate = data.stored_date;
      this.oldDescription = data.description;
      this.articleForm.setValue({
        description: data.description,
      });
    });
  }

  onFormSubmit() {
    let removeStoredDate = false;
    this.isLoadingResults = true;
    this.data.description = this.enteredValue;
    if(this.storedDate) {
      this.data.stored_date = this.storedDate;
    } else {
      this.data.stored_date = '';
      removeStoredDate = true;
    }
    this.api.updateMood(this.data.id, this.data, removeStoredDate)
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
