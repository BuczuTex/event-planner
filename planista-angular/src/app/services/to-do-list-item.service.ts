import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ToDoListItem } from '../models/toDoListItem';

@Injectable({
  providedIn: 'root'
})
export class ToDoListItemService {
  readonly url = "https://localhost:7290/api/ToDoListItems";
  readonly eventUrl = "https://localhost:7290/api/Events";
  readonly authHeader = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getToDoListItems() {
    return this.http.get<Array<ToDoListItem>>(this.url, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  getToDoListItemsByCategory(category: string) {
    return this.http.get<Array<ToDoListItem>>(`${this.url}/${category}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  getToDoListItemsByEventId(id: number) {
    return this.http.get<Array<ToDoListItem>>(`${this.eventUrl}/${id}/ToDoListItems`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  postToDoListItem(item: ToDoListItem) {
    const toDoItemJson = JSON.stringify(item).replace(/[_]/g, "");
    return this.http.post<ToDoListItem>(this.url, toDoItemJson, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  deleteToDoItem(id: number) {
    return this.http.delete(this.url + `/${id}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  recomendToDoItems(id: number) {
    return this.http.get<Array<ToDoListItem>>(`${this.eventUrl}/${id}/Recommend`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  putToDoItem(item: ToDoListItem) {
    const toDoItemJson = JSON.stringify(item).replace(/[_]/g, "");
    return this.http.put<ToDoListItem>(`${this.url}/${item.id}`, toDoItemJson, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
}
