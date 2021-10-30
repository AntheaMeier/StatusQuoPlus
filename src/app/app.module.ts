import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {RouterModule} from "@angular/router";
// import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

 import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { ResponsiveHeaderComponent } from './responsive-header/responsive-header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import { LoginZweiComponent } from './login-zwei/login-zwei.component';
// @ts-ignore






@NgModule({
  declarations: [
    AppComponent,
    ResponsiveHeaderComponent,
    LoginComponent,
    RegisterComponent,
    LoginZweiComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // RouterModule,
    //LayoutModule,
    MatToolbarModule,
    MatButtonModule,

    // MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    // MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
