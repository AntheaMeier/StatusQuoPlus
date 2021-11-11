import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {GoalsCreateComponent} from "../goals-create/goals-create.component";
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-goals-edit',
  templateUrl: './goals-edit.component.html',
  styleUrls: ['./goals-edit.component.css']
})
export class GoalsEditComponent {

  articleForm: FormGroup =  this.formBuilder.group({
    description: this.formBuilder.control('initial value', Validators.required)
  });
  id = '';
  description = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();


  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<GoalsCreateComponent>, private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(GoalsEditComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {

  }

  ngOnInit() {
    this.getArticle(this.route.snapshot.params.id);
    this.articleForm = this.formBuilder.group({
      'description' : [null, Validators.required]
    });
  }

  getArticle(id: any) {
    this.api.getArticle(id).subscribe((data: any) => {
      this.id = data.id;
      this.articleForm.setValue({
        description: data.description
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateArticle(this.id, this.articleForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/show-article', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
