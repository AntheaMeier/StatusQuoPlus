import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import  {MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../../../services/auth.service';
import { Mood } from 'src/app/models/mood';
import {MoodEditComponent} from "../mood-edit/mood-edit.component";
import {FormControl, FormGroup} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter} from "@angular/material/core";
import {formatDate} from "@angular/common";

export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date,'dd.MM.yyyy',this.locale);;
    } else {
      return date.toDateString();
    }
  }
}

@Component({
  selector: 'app-display-mood',
  templateUrl: './display-mood.component.html',
  styleUrls: ['./display-mood.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class DisplayMoodComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  disable: boolean = true;
  idloggedInUser: string = '';
  moods: Mood [] = [];
  @Input() loadNewMood?: boolean;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private api: ApiService,
    ) {
    this.range.valueChanges.subscribe( res => {
      if(res.start != null && res.end != null) {
        this.disable = false;
      }
    });
  }

  ngOnInit(): void {
    this.idloggedInUser = this.auth.getUserDetails()._id;
    this.getMood(this.idloggedInUser);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ngOnInit();
  }

  getMood(idloggedInUser: string): any {
    this.api.getMoodForUser(idloggedInUser).subscribe(
      (res) => {
        this.moods = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calculateIfEditable(creation_date: Date): boolean {
    let date2 = new Date(creation_date);
    let date1 = new Date();
    let time = date1.getTime() - date2.getTime();
    let days = (time / (1000 * 3600 * 24)) + 1; //Difference in Days*/
    if (days > 7) {
      return false;
    } else if (days <= 7) {
      return true;
    }
    return false;
  }

  openMoodEditDialog(mood: Mood) {
    const dialogRef = this.dialog.open(MoodEditComponent, {
      data: {mood: mood},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(this.range.value.start != null && this.range.value.start != null) {
        this.filterMood();
      } else {
        this.ngOnInit();
      }
    });
  }

  filterMood() {
    this.api.getMoodsToDateRange(this.idloggedInUser, this.range.value.start, this.range.value.end)
      .subscribe( res => {
      console.log('HIIIER::::: ' + res);
      this.moods = res;
    }, (err) => {
      console.log(err);
    });
  }
}
