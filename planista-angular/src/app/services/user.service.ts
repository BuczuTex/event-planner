import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = "https://localhost:7290/api/Users";
  readonly authHeader = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Array<User>>(this.url, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  putUser(user: User) {
    const userJson = JSON.stringify(user).replace(/[_]/g, "");
    return this.http.put(`${this.url}/${user.id}`, userJson, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  getEventsByUserId(id: string) {
    return this.http.get<Array<Event>>(`${this.url}/${id}/Events`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
}
