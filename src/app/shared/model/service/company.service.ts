import { Injectable } from '@angular/core';
import { company } from '../entities/company';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  private apiUrl = 'https://canelaaccounmanagermicroservice-qa.up.railway.app/api/talentsoft/company/save';
  constructor(private http: HttpClient) { }


  agregarCompany(company: company): Observable<company> {
    return this.http.post<any>(`${this.apiUrl}`, company);
  }

}
