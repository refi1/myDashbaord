import { Component, OnInit ,OnDestroy} from '@angular/core';
import {PostService} from '../post.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Post } from '../post.model';
import {UserService} from '../../user.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit ,OnDestroy {
 private authStatusSub :Subscription;
 userIsAuthenticated = false;
  post: Post[];
  displayedColumns = ['title','description', 'responsible', 'severity', 'status', 'actions'];
  userId:string;

  constructor(private postService: PostService,
     private router: Router,
    private authService :UserService) { }
private postsSub: Subscription;
  ngOnInit() {
    this.fetchPost();
    this.userId=this.authService.getUserId();
      console.log(this.userId);
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId=this.authService.getUserId();
        console.log(this.userId);
      });
  }

  fetchPost() {
  this.postsSub =  this.postService
      .getPosts()
      .subscribe((data: Post[]) => {
        this.post = data;
        console.log('Data requested ...');
        console.log(this.post);
      });
    this.authStatusSub=this.authService.getAuthStatusListener().subscribe();
    // this.authStatusSub = this.authService
    //   .getAuthStatusListener()
    //   .subscribe(isAuthenticated => {
    //     this.userIsAuthenticated = isAuthenticated;
    //     this.userId=this.authService.getUserId();
    //   });
  }

  editPost(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deletePost(id) {
    this.postService.deletePosts(id).subscribe(() => {
      this.fetchPost();
    });
  }
  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
