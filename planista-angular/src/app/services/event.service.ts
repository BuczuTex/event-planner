import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap, concat, forkJoin } from 'rxjs';
import { Event } from '../models/event';
import { Errand } from '../models/errand';
import { AddressService } from './address.service';
import { Address } from '../models/address';
import { Company } from 'src/app/models/company';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  readonly urlEvent = "https://localhost:7290/api/Events";
  readonly urlAddress = "https://localhost:7290/api/Addresses";
  readonly urlCategory = "https://localhost:7290/api/Categories";
  readonly authHeader = localStorage.getItem('token');

  constructor(private http: HttpClient, private addressService: AddressService) {}

  getCategories(): Observable<string> {
    return this.http.get(this.urlCategory, {
      headers: { "Content-Type": "application/json" }
    }).pipe(map((res: string[]) => res), tap(console.log));
  }
  getEvent(id: number) {
    return this.http.get<Event>(this.urlEvent + "/" + id, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
       }
    });
  }
  getEvents() {
    return this.http.get<Event>(this.urlEvent, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    }).pipe(map((data: any) => data));
  }
  postEvent(eventData: Event, addressData: Address) {
    eventData.userId = localStorage.getItem('id');

    const eventJson = JSON.stringify(eventData).replace(/[_]/g, "");
    const addressJson = JSON.stringify(addressData).replace(/[_]/g, "");

    let addressPost = this.http.post(this.urlAddress, addressJson, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    }).pipe(map((res: any) => res.id), tap(id => eventData.addressId = id));
    
    let eventPost = this.http.post(this.urlEvent, eventJson, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    }).pipe(tap(console.log));

    return concat(addressPost, eventPost);
  }
  putEvent(id: number, eventData: any) {
    const eventJson = JSON.stringify(eventData).replace(/[_]/g, "");

    return this.http.put(`${this.urlEvent}/${id}`, eventJson, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  deleteEvent(id: number) {
    return this.http.delete(`${this.urlEvent}/${id}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  getErrandsByEventId(eventId: number) {
    return this.http.get<Array<Errand>>(`${this.urlEvent}/${eventId}/Errands`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  getCompaniesByEventId(eventId: number) {
    return this.http.get<Array<Company>>(`${this.urlEvent}/${eventId}/Companies`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
}
