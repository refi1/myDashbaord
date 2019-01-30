import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../post.model';
@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {

  createForm: FormGroup;

  constructor(private postService: PostService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      responsible: ['', Validators.required],
      description: ['', Validators.required],
      severity:['', Validators.required],
      // status:['', Validators.required],
        });
  }

  addPosts(title, responsible, description, severity) {
    this.postService.addPosts(title, responsible, description, severity).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
