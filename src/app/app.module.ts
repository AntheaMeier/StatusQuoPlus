import {NgModule} from '@angular/core';
import {AppComponent} from "./app.component";
import {GoalsCreateComponent} from "./components/goals/goals-create/goals-create.component";
import {TodoComponent} from "./components/todo/todo.component";
import {DeleteTaskDialogComponent} from "./components/todo/delete-task-dialog/delete-task-dialog.component";
import {ResponsiveHeaderComponent} from "./components/responsive-header/responsive-header.component";
import {LoginComponent} from "./components/login/login.component";
import {DeleteConfirmationDialogComponent} from "./components/goals/delete-confirmation-dialog/delete-confirmation-dialog";
import {ListReviewsComponent} from "./components/annual-review/list-reviews/list-reviews.component";
import {AnnualReviewComponent} from "./components/annual-review/annual-review.component";
import {GoalsEditComponent} from "./components/goals/goals-edit/goals-edit.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {MatExpansionModule} from "@angular/material/expansion";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {AppRoutingModule} from "./app-routing.module";
import {A11yModule} from "@angular/cdk/a11y";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {LayoutModule} from "@angular/cdk/layout";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {CdkTreeModule} from "@angular/cdk/tree";
import { LottieModule } from 'ngx-lottie';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatMenuModule} from "@angular/material/menu";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {MatDividerModule} from "@angular/material/divider";
import {CdkTableModule} from "@angular/cdk/table";
import {PortalModule} from "@angular/cdk/portal";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatBadgeModule} from "@angular/material/badge";
import {MatStepperModule} from "@angular/material/stepper";
import {DeleteDialogComponent} from './components/annual-review/delete-dialog/delete-dialog.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {TeamviewComponent} from './components/teamview/teamview.component';
import {MatTabsModule} from "@angular/material/tabs";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {EditReviewComponent} from './components/annual-review/edit-review/edit-review.component';
import { TodoEditComponent } from './components/todo/todo-edit/todo-edit.component';
import {NgxTranslateModule} from "./translate/ngx-translate.module";
import { OverviewComponent } from './components/overview/overview.component';
import { SuccessesComponent } from './components/goals/successes/successes.component';
import { GoalCompletedDialogComponent } from './components/goals/goal-completed-dialog/goal-completed-dialog.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FeedbackCreateComponent } from './components/feedback/feedback-create/feedback-create.component';
import { FeedbackDialogComponent } from './components/feedback/feedback-dialog/feedback-dialog.component';
import { SearchBarComponent } from './components/feedback/search-bar/search-bar.component';
import { SendConfirmationDialogComponent } from './components/feedback/send-confirmation-dialog/send-confirmation-dialog/send-confirmation-dialog.component';
import { SnackBarComponent } from './components/feedback/snack-bar/snack-bar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { MoodComponent } from './components/mood/mood.component';
import { MoodTrackenComponent } from './components/mood/mood-tracken/mood-tracken.component';
import { DisplayMoodComponent } from './components/mood/display-mood/display-mood.component';
import { MoodTrackerStatistikComponent } from './components/mood/mood-tracker-statistik/mood-tracker-statistik.component';
import { ChartComponent } from './components/mood/chart/chart.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { HelpDialogComponent } from './components/mood/help-dialog/help-dialog.component';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    ResponsiveHeaderComponent,
    GoalsCreateComponent,
    GoalsEditComponent,
    LoginComponent,
    DeleteConfirmationDialogComponent,
    TodoComponent,
    DeleteTaskDialogComponent,
    AnnualReviewComponent,
    ListReviewsComponent,
    DeleteDialogComponent,
    NotFoundComponent,
    TeamviewComponent,
    EditReviewComponent,
    TodoEditComponent,
    OverviewComponent,
    SuccessesComponent,
    GoalCompletedDialogComponent,
    FeedbackComponent,
    FeedbackCreateComponent,
    FeedbackDialogComponent,
    SearchBarComponent,
    SendConfirmationDialogComponent,
    SnackBarComponent,
    MoodComponent,
    MoodTrackenComponent,
    DisplayMoodComponent,
    MoodTrackerStatistikComponent,
    ChartComponent,
    HelpDialogComponent
  ],
    imports: [
        LottieModule.forRoot({player: playerFactory}),
        MatExpansionModule,
        ScrollingModule,
        ReactiveFormsModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        DragDropModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        BrowserAnimationsModule,
        MatInputModule,
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        MatSelectModule,
        LayoutModule,
        A11yModule,
        ClipboardModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDividerModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatNativeDateModule,
        MatRippleModule,
        MatSelectModule,
        MatTooltipModule,
        OverlayModule,
        PortalModule,
        MatTabsModule,
        CdkAccordionModule,
        NgxTranslateModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
    ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [
    AuthGuardService,
    MatSnackBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
