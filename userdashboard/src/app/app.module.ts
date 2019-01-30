import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyDashboardComponent } from "./charts/my-dashboard/my-dashboard.component";
import {
  MatGridListModule,
  MatMenuModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTabsModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatListModule,
  MatTooltipModule
} from "@angular/material";
import { AppRoutingModule } from "./app-routing.module";
import { NotfoundComponent } from "./notfound/notfound.component";
import { HomeComponent } from "./home/home.component";
import { ListComponent } from "./components/list/list.component";
import { CreatepostComponent } from "./components/createpost/createpost.component";
import { EditpostComponent } from "./components/editpost/editpost.component";
import { PostService } from "./components/post.service";
import { UserService } from "./user.service";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from "./error/error.component";

import { NgbdCarouselBasic } from "./about/carousel-basic";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AboutComponent } from "./about/about.component";
import { DialogComponent } from "./charts/dialog/dialog.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { GridsterModule } from "angular-gridster2";
import { DialogService } from "./charts/dialog.service";
import { DashboardService } from "./charts/dashboard.service";

import "hammerjs";

@NgModule({
  declarations: [
    AppComponent,
    MyDashboardComponent,
    NotfoundComponent,
    HomeComponent,
    ListComponent,
    CreatepostComponent,
    EditpostComponent,
    SignupComponent,
    LoginComponent,
    NavigationComponent,
    ErrorComponent,
    NgbdCarouselBasic,
    AboutComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    MatSidenavModule,
    ChartsModule,
    NgbModule.forRoot(),
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    GridsterModule
  ],
  providers: [
    PostService,
    UserService,
    DashboardService,
    DialogService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, DialogComponent]
})
export class AppModule {}
