import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '../models/company';
import { tap, map, filter } from 'rxjs';
import { Errand } from '../models/errand';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  readonly urlCompany = "https://localhost:7290/api/Companies";
  readonly urlUser = "https://localhost:7290/api/Users";
  readonly authHeader = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  postCompany(company: Company) {
    var data = JSON.stringify(company).replace(/[_]/g, "");
    return this.http.post<Company>(this.urlCompany, data, {
      headers: { "Content-Type": "application/json" }
    });
  }
  getCompanies() {
    return this.http.get<Array<Company>>(this.urlCompany, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    }).pipe(tap(console.log), map((res: Array<Company>) => res));
  }
  getCompanyByUserId(userId: string) {
    return this.http.get<Company>(`${this.urlUser}/${userId}/Companies`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
        
      }
    });
  }
  getCompanyErrands(state: number,companyId: number) {
    return this.http.get<Array<Errand>>(`${this.urlCompany}/${companyId}/Errands`, {
      headers: { 
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
      }
    }).pipe(filter(x => x.some(errand => errand.state === state)));
  }
  getCompanyProposals(companyId: number) {
    return this.http.get<Array<Errand>>(`${this.urlCompany}/${companyId}/Errands/Proposals`, {
      headers: {
        "Content-Type": "application/json",
        "Authentication": this.authHeader,
      }
    });
  }
}
