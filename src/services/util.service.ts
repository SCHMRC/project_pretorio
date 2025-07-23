import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  date: Date;

  constructor() {
    this.date = new Date();
  }

  getCurrentYear(): number {
    return this.date.getFullYear();
  }
}
