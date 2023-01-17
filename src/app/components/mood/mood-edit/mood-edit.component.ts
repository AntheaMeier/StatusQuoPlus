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

  mood: Mood = this.data.mood;
  emotionTemp: string = this.data.mood.emotion;
  @Input() idDialog: any;
  enteredValue = "";

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
    this.enteredValue = this.data.mood.text;
  }

  onFormSubmit() {
    this.mood.text = this.enteredValue.toString();
    console.log('mood.text : ' + this.mood.text);
    this.mood.emotion = this.emotionTemp;
    this.api.updateMood(this.mood).subscribe( res => {
      this.dialogRef.close();
    }, (err: any) => {
        console.log(err);
    });
  }

  chooseSentiment(sentiment: string) {
    this.emotionTemp = sentiment;
  }

  deleteMood() {
    this.api.deleteMood(this.mood._id).subscribe( res => {
      this.dialogRef.close();
    }, (err: any) => {
      console.log(err);
    });
  }
}
