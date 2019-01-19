import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Iparticipant } from './participant';
import { Icriteria } from './criteria';
import {throwError as observableThrowError, Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _url: string  = "/assets/data/participant_data.json";
  private _url2: string  = "/assets/data/criteria_data.json";


  constructor(private http: HttpClient) { }

  getParticipant(): Observable<Iparticipant[]>{
    return this.http.get<Iparticipant[]>(this._url).pipe(
        catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "Server Error");
  }
  
  getCriteria(): Observable<Icriteria[]>{
    return this.http.get<Icriteria[]>(this._url2).pipe(
      catchError(this.errorHandler));
  }
  
}
