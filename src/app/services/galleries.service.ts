import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GalleriesService {
  constructor(private http: HttpClient) {}

  private json: string = '/assets/images.json';

  getImages(): Observable<any[]> {
    return this.http.get<any[]>(this.json);
  }
}
