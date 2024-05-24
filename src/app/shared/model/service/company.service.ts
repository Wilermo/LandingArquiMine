import { Injectable } from '@angular/core';
import { company } from '../entities/company';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'http://localhost:8082/api/talentsoft/company/save';
  constructor(private http: HttpClient) { }


  agregarCompany(company: company): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, company);
  }

}
