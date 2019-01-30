import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {PostService} from '../post.service';
import { MatSnackBar } from '@angular/material';
import { Post } from '../post.model';
@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {


    id: String;
    issue: any = {};
    updateForm: FormGroup;

    constructor(private postService: PostService,
       private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private fb: FormBuilder) {
      this.createForm();
    }

    createForm() {
      this.updateForm = this.fb.group({
        title: ["", Validators.required],
        responsible: ["", Validators.required],
        description: ["", Validators.required],
        severity: ["", Validators.required],
        status: ["", Validators.required],
      });
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        this.id = params.id;
        this.postService.getPostsById(this.id).subscribe(res => {
          this.issue = res;
          this.updateForm.get('title').setValue(this.issue.title);
          this.updateForm.get('responsible').setValue(this.issue.responsible);
          this.updateForm.get('description').setValue(this.issue.description);
          this.updateForm.get('severity').setValue(this.issue.severity);
          this.updateForm.get('status').setValue(this.issue.status);
        });
      });
    }

    updatePost(title, responsible, description, severity, status) {
      this.postService.updatePosts(this.id, title, responsible, description, severity, status).subscribe(() => {
        this.snackBar.open('Issue updated successfully', 'OK', {
          duration: 3000
        });
      });
    }

}
