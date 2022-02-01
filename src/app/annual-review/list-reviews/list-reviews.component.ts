import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../shared/review';
import {ApiService} from 'src/app/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {Login} from "../../shared/login";
import {AuthService} from "../../services/auth.service";
import { EditReviewComponent } from '../edit-review/edit-review.component';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.css']
})
export class ListReviewsComponent implements OnInit {
  edit = false;
  enteredContent = '';
  _id = '';
  date = '';
  description = '';
  isLoadingResults = true;
  idDialog: any = '';

  @Input() selectedRole : String = "";

  @Input() currentUrl = "";
  review: Review = {_id: '', date: '', description: '', userid: ''};
  idloggedInUser: String = "";
  dataUsers: Login[] = [];
  showReviewsToOneUser = false;
  @Input() idTeamMember: any = "";
  @Input() reviewsToOneUser: Review[] = [];

  reviewForm: FormGroup = this.formBuilder.group({
    description: ['', Validators.required],

  });

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.api.getUsers()
      .subscribe((res: any) => {
        this.dataUsers = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.idloggedInUser = this.auth.getUserDetails().user_info._id;
    if(this.selectedRole!= "Vorgesetzte_r" ) {
      this.getReviewDetails(this.idloggedInUser);
    }

    if(this.selectedRole == "Vorgesetzte_r"){
      this.getReviewDetails(this.idTeamMember);
      console.log('id member ' + this.idTeamMember);
    }

    if(this.currentUrl  == '/teamview/618cecd2e576c9b3d35be3d8' || this.currentUrl == '/teamview/61b1168ec69f475afd6ccd88') {
      this.getReviewDetails(this.idTeamMember);



    }
  }

  getReviewDetails(id: any) {

      this.api.getReviewsToUser(id)
        .subscribe((data: any) => {
          this.reviewsToOneUser = data;
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
      this.showReviewsToOneUser = true;



  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteDialog(id: any): void {
    this.idDialog = id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '40%',
      data: {'id': this.idDialog}
    });
  }

  openEditDialog(id: any): void {
    this.idDialog = id;
    const dialogRef = this.dialog.open(EditReviewComponent, {
      width: '80%',
      height: '80%',
      data: {'id': this.idDialog}
    });
  }

  editOnOff() {
    this.edit = !this.edit;
  }
}
