import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  readonly urlAddress = "https://localhost:7290/api/Addresses";
  readonly authHeader = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  getAddress(id: number) {
    return this.http.get(`${this.urlAddress}/${id}`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
      }
    });
  }
  postAddress(address: Address) {
    var data = JSON.stringify(address).replace(/[_]/g, "");
    return this.http.post<Address>(`${this.urlAddress}`, data, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
     }
    });
  }
  putAddress(id: number, addressData: any) {
    const addressJson = JSON.stringify(addressData).replace(/[_]/g, "");
    
    return this.http.put<Address>(`${this.urlAddress}/${id}`, addressJson, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
      }
    });
  }
}