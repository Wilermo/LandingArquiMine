import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Card} from "../entities/card";

@Injectable({
  providedIn: 'root'
})
export class RegistrarTarjetaService {

  constructor(private http: HttpClient) { }

  // registrarTarjeta(): Observable<any> {
  //   const url = `${environment.cardURL}`;
  //
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //
  //   return this.http.post<any>("http://localhost:8762/card/save", { headers });
  // }

  registrarTarjeta(card: Card): Observable<any> {
    return this.http.post<Card>(`http://localhost:8082/card/save`, card);
  }
}
