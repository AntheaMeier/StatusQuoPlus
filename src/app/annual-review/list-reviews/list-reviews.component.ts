import { Component, OnInit } from '@angular/core';
import { Review } from '../../shared/review';
import { ApiService } from 'src/app/shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/goals/delete-confirmation-dialog/delete-confirmation-dialog';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.css']
})
export class ListReviewsComponent implements OnInit {

  edit = false;
  enteredContent = '';

  idDialog: any = '';
  data: Review[] = [];
  isLoadingResults = true;
  review: Review = { id: '', date: '', description: ''};

  reviews: Review[] = [];
  

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog ) { }

  getReviewDetails(id: any) {
    this.api.getReview(id)
      .subscribe((data: any) => {
        this.review = data;
        this.isLoadingResults = false;
      });
  }

  ngOnInit(): void {
    this.api.getReviews()
      .subscribe((res: any) => {
        this.data = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
    this.getReviewDetails(this.route.snapshot.params.id);
  }

  // deleteDialog(id: any): void {

  //   this.idDialog= id;
  //   const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
  //     width: '40%',
  //     data :{'id': this.idDialog }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.ngOnInit();
  //   });
  // }

  deleteReview(id: any) {
    if (confirm('Are you sure you want to delete this item?')) {
    this.isLoadingResults = true;
    this.api.deleteReview(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/articles']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
      this.ngOnInit();
    }
  }

  editOnOff() {
    if (this.edit)
    {
      this.edit = false;
    }
    else
    {
      this.edit = true;
    }
  }
}
