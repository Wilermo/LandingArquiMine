import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../auth/user';
import {Employee} from "../entities/employee";


@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  private apiUrl = 'https://canelausermanagementmicroservice-qa.up.railway.app/user/save';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    const url = `${environment.authURL}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  });

    return this.http.post<any>(url, user, { headers, responseType: 'text' as 'json' });
  }

  agregarUsuario(usuario: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, usuario);
  }

  agregarEmpleado(empleado: Employee) {
    //return this.http.post<any>(`https://empresasnominamicroservice-qa.up.railway.app/employee/createEmployee`, empleado);
    return this.http.post<any>(`http://localhost:8080/employee/createEmployee`, empleado);

  }
}
