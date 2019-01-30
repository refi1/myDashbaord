import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit,OnDestroy {

  userIsAuthenticated = false;
   private authListenerSubs: Subscription;
   menuOpen: boolean;
   constructor(private authService: UserService) {}

   ngOnInit() {
     this.userIsAuthenticated = this.authService.getIsAuth();
     this.authListenerSubs = this.authService
       .getAuthStatusListener()
       .subscribe(isAuthenticated => {
         this.userIsAuthenticated = isAuthenticated;
       });
       this.menuOpen = true;
   }

   onLogout() {
     this.authService.logout();
   }

   ngOnDestroy() {
     this.authListenerSubs.unsubscribe();
   }
   toggleMenu(status: boolean) {
  this.menuOpen = status;
}
}
