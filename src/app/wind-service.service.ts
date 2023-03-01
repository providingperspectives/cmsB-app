import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindServiceService {

  constructor() { }

    getNativeWindow() {
     return window;
  }
}