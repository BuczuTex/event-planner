import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Errand } from '../models/errand';

@Injectable({
  providedIn: 'root'
})
export class ErrandService {
  readonly urlErrand = "https://localhost:7290/api/Errands";
  readonly authHeader = localStorage.getItem('token');

  constructor(private http: HttpClient) { }
  postErrand(errandData: Errand) {
    var errandJson = JSON.stringify(errandData).replace(/[_]/g, "");
    return this.http.post<Errand>(`${this.urlErrand}`, errandJson, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
       }
    });
  }
  putErrand(errand: Errand) {
    var errandJson = JSON.stringify(errand).replace(/[_]/g, "");
    return this.http.put<Errand>(`${this.urlErrand}/${errand.id}`, errandJson, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  getErrands() {
    return this.http.get<Array<Errand>>(`${this.urlErrand}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
       }
    });
  }
  deleteErrand(id: number) {
    return this.http.delete(`${this.urlErrand}/${id}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
       }
    });
  }
}
