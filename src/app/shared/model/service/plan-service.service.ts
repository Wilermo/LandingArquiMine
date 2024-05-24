import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { plan } from '../entities/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanServiceService {
  private apiUrl = 'http://localhost:8082/plan/list';
  constructor(private http: HttpClient) { }

  getPlanes(): Observable<plan[]> {
    return this.http.get<plan[]>(this.apiUrl);
  }
  getPlan(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
