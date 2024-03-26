import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService {
  constructor(private http: HttpClient) {}

  link: string =
    'https://emailvalidation.abstractapi.com/v1/?api_key=ca8aadd769da4f28b6bd6f2421f32173&email=';

  getEmail = (email: string) => {
    this.link = `https://emailvalidation.abstractapi.com/v1/?api_key=ca8aadd769da4f28b6bd6f2421f32173&email=${email}`;
  };

  getApiData = (): Observable<any> => {
    return this.http.get<any>(this.link);
  };
}
