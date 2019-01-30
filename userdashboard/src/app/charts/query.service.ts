import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class QueryService {
  url="http://localhost:4000/querys";
  constructor(private http :HttpClient) { }

  getFemale(){
  return this.http.post(`${this.url}/f`,'');
  }
  getMale(){
      return this.http.post(`${this.url}/m`,'');
  }
  getCountM(){
    return this.http.post(`${this.url}/cm`,'');
  }
  getCountF(){
    return this.http.post(`${this.url}/cf`,'');
  }
  // getAuthor(){
  //   return this.http.post(`${this.url}/postautor` ,'');
  // }
  getAge(){
    return this.http.post(`${this.url}/name`,'');
  }
  getPosts(){
    return this.http.post(`${this.url}/postbyusers`,'');
  }
  getSeverity(){
    return this.http.post(`${this.url}/severity`,'');
  }
  getHight(){
    return this.http.post(`${this.url}/countHigh`,'');
  }
  getMedium(){
    return this.http.post(`${this.url}/countMedium`,'');
  }
  getLow(){
    return this.http.post(`${this.url}/countLow`,'');
  }
  getDone(){
    return this.http.post(`${this.url}/countDone`,'');
  }
  getProgress(){
    return this.http.post(`${this.url}/countProgress`,'');
  }
  getOpen(){
    return this.http.post(`${this.url}/countOpen`,'');
  }
}
