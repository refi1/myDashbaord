import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url="http://localhost:4000/posts";
  constructor(private http :HttpClient) { }

  getPosts(){
    return this.http.get(`${this.url}/all`);
  }
  getPostsById(id){
return this.http.get(`${this.url}/${id}`);
  }

  addPosts(title,responsible,description,severity){
    const posts ={
      title :title,
      responsible:responsible,
      description:description,
      severity:severity,
      // status:status
    };
    return this.http.post(`${this.url}/add`,posts);

  }

  updatePosts(id, title,responsible,description,severity,status){
    const posts ={
      title :title,
      responsible:responsible,
      description:description,
      severity:severity,
      status:status,
        };
    return this.http.post(`${this.url}/update/${id}`,posts);
  }
  deletePosts(id){
    return this.http.get(`${this.url}/delete/${id}`);
  }
}
