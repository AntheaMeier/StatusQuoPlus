import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ResponsiveHeaderComponent} from './responsive-header/responsive-header.component';
import {LayoutModule} from '@angular/cdk/layout';
import {GoalsCreateComponent} from './goals/goals-create/goals-create.component';
import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {OverlayModule} from '@angular/cdk/overlay';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from "./app-routing.module";
import { HttpClientModule } from '@angular/common/http';
import { GoalsEditComponent } from './goals/goals-edit/goals-edit.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { LoginComponent } from './login/login.component';
import {AuthGuardService} from "./auth-guard.service";
import { DeleteConfirmationDialogComponent } from './goals/delete-confirmation-dialog/delete-confirmation-dialog';
import { TodoComponent } from './todo/todo.component';
import {TaskdataService} from "./taskdata.service";



@NgModule({
  declarations: [
    AppComponent,
    ResponsiveHeaderComponent,
    GoalsCreateComponent,
    GoalsEditComponent,
    LoginComponent,
    DeleteConfirmationDialogComponent,
    TodoComponent,
  ],
    imports: [
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule,
        MatFormFieldModule,
        MatSelectModule,
        LayoutModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        A11yModule,
        ClipboardModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTooltipModule,
        OverlayModule,
        PortalModule,
        ScrollingModule,
        FormsModule,
        MatProgressBarModule,
    ],
  providers: [AuthGuardService, TaskdataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
