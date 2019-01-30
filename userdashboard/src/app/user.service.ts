import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of, Subject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Auth } from "./login/auth.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private userId: string;

  url = "http://localhost:4000/users";

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  getAllUsers() {
    return this.http.get(`${this.url}/all`);
  }

  getUserById(id) {
    return this.http.get(`${this.url}/${id}`);
  }

  addUser(emer, mbimer, password, gjinia, email, shteti, qyteti, mosha) {
    const user = {
      emer: emer,
      mbimer: mbimer,
      password: password,
      gjinia: gjinia,
      email: email,
      shteti: shteti,
      qyteti: qyteti,
      mosha: mosha
    };
    return this.http.post(`${this.url}/add`, user);
  }

  updateUser(id, emer, mbimer, password, gjinia, email, shteti, qyteti, mosha) {
    const user = {
      emer: emer,
      mbimer: mbimer,
      password: password,
      gjinia: gjinia,
      email: email,
      shteti: shteti,
      qyteti: qyteti,
      mosha: mosha
    };
    return this.http.post(`${this.url}/update/${id}`, user);
  }
  deleteUser(id) {
    return this.http.get(`${this.url}/delete/${id}`);
  }

  signUp(formData: NgForm) {
    return this.http.post(`${this.url}/add`, formData).pipe(
      tap(user => {
        console.log(user);
        this.router.navigate(["/login"]);
      }),
      catchError(this.handleError("Signup", []))
    );
  }

  login(email: String, password: String) {
    const users: Auth = { email: email, password: password };
    return this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        `${this.url}/login`,
        users
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(["/dashboard"]);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
    this.userId = null;
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }
}
