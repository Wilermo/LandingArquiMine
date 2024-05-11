import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { FormInfo } from 'src/app/shared/model/service/form-info';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "*/*"
    })
  };

  constructor(private http: HttpClient) { }

  sendFormInfo(info: FormInfo) : Observable<FormInfo>{
    console.log("SERB: ", info)
    return this.http.post<FormInfo>("http://localhost:8762/form/send",info,this.httpOptions)
  }
}
