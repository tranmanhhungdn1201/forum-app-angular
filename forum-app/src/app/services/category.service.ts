import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl: string = `http://localhost:5000/categories`;

  constructor(private http:HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryIDBySlug(slug: string): any {
    let url = this.apiUrl + `?slug_like=^${slug}$`;
    return this.http.get<Category>(url);
  }
}
