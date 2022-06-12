import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Opinion } from '../models/opinion';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {
  readonly url = "https://localhost:7290/api/Opinions";
  readonly authHeader = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getOpinions() {
    return this.http.get<Array<Opinion>>(this.url, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  deleteOpinion(index: number) {
    return this.http.delete(`${this.url}/${index}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  postOpinion(opinion: Opinion) {
    const opinionJson = JSON.stringify(opinion).replace(/[_]/g, "");

    return this.http.post(this.url, opinionJson, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
}
