import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
  // Method to set token
  setToken(token: string): void {
    this.setItem('token', token);
  }

  // Method to retrieve token
  getToken(): string | null {
    return this.getItem('token');
  }

  // Method to remove token
  removeToken(): void {
    this.removeItem('token');
  }
}
