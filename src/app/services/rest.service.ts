import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { 
  }
  
  public getCovidData(url : string) {
    return this.httpClient.get(url)
  }
}
