import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GoalsCreateComponent} from "../goals-create/goals-create.component";
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-goals-edit',
  templateUrl: './goals-edit.component.html',
  styleUrls: ['./goals-edit.component.css'],
})
export class GoalsEditComponent implements OnInit {

  @Input() idDialog: any;
  enteredValue = "";
  oldDescription: any;
  id = '';
  isLoadingResults = false;
  enteredExpiryDate?: Date;
  placeholderExpiryDate = 'Fälligkeitsdatum festlegen';

  articleForm: FormGroup = this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
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
    this.getGoal(this.data.id);
    this.articleForm = this.formBuilder.group({
      'description': ['', Validators.required]
    });
  }

  getGoal(id: any) {
    this.api.getGoal(id).subscribe((data: any) => {
      this.id = data.id;
      this.enteredExpiryDate = data.expiry_date;
      if (data.expiry_date){
        this.placeholderExpiryDate = moment(data.expiry_date).format('DD.MM.yyyy');
      } else {
        this.placeholderExpiryDate = 'Datum auswählen';
      }
      this.oldDescription = data.description;
      this.articleForm.setValue({
        description: data.description,
      });
    });
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

  faelligkeitsdatumLoeschen() {
    this.enteredExpiryDate = undefined;
    this.placeholderExpiryDate = 'Datum auswählen';
  }
}
