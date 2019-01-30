import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { MyDashboardComponent } from "./charts/my-dashboard/my-dashboard.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { HomeComponent } from "./home/home.component";
import { ListComponent } from "./components/list/list.component";
import { CreatepostComponent } from "./components/createpost/createpost.component";
import { EditpostComponent } from "./components/editpost/editpost.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { AuthGuard } from "./auth.guard";
import { AboutComponent } from "./about/about.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "list", component: ListComponent },
  { path: "edit/:id", component: EditpostComponent, canActivate: [AuthGuard] },
  { path: "create", component: CreatepostComponent, canActivate: [AuthGuard] },
  { path: "navigation", component: NavigationComponent },
  {
    path: "dashboard",
    component: MyDashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: "404", component: NotfoundComponent },
  { path: "about", component: AboutComponent },
  { path: "**", redirectTo: "/404" }
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
