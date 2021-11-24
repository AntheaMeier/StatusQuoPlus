import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }


  getUserDetails(): any {
    return localStorage.getItem('userData') ? JSON.parse(<string>localStorage.getItem('userData')) : null;
  }

  setDataInLocalStorage(variableName: string, data: any): any {
    localStorage.setItem(variableName, data);
  }

  clearStorage(): any {
    localStorage.clear();
  }
}
