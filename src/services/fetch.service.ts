import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from 'src/model/data.model';
import { PostData } from 'src/model/postdata.model';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  http: HttpClient;
  URL = "https://www.sliptstream.it/pretorio/";

  constructor(http: HttpClient) {
    this.http = http;
  }

  post(data: PostData, url?: string): Promise<any> {
    if (url) {
      this.URL = url
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.URL, data).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error)
      });
    });
  }


  get(url: string): Promise<Data[]> {
    return new Promise((resolve, reject) => {
      this.http.get(this.URL).subscribe({
        next: (data) => resolve(data as Data[]),
        error: (error) => reject(error)
      });
    });
  }
}
