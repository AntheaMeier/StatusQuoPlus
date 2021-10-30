// auth legt den Token im localStorage ab und holt ihn auch von dort
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor() { }

  // laden wir die userData aus dem localStorage
  getUserDetails(): any {
    return localStorage.getItem('userData') ? JSON.parse(<string>localStorage.getItem('userData')) : null;
  }

  // speichern wir die userData im localStorage
  setDataInLocalStorage(variableName: string, data: string): any {
    localStorage.setItem(variableName, data);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  // löscht den gesamten localStorage
  clearStorage(): any {
    localStorage.clear();
  }
}
