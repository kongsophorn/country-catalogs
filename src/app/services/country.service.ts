import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environtment-pru';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CountryService {
  urlApi = environment.api;

  constructor(private http: HttpClient) {   }

  getAll(payload: any): Observable<any>{
    return this.http.get<any>(this.urlApi, payload);
  }
  

}