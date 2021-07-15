import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Question } from '../models/Question';
import { CategoryService } from './category.service';
import { mergeMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class QuestionService {
  private apiUrl: string = `http://localhost:5000/questions`;

  constructor(private http:HttpClient, private categoryService: CategoryService) { }

  getQuestionBySlugCategory(slug: string): Observable<Question[]> {
    return this.categoryService.getCategoryIDBySlug(slug).pipe(
      mergeMap((data:any) => this.getQuestionsByCategoryID(data[0]['id']))
    )
  }

  getQuestionsByCategoryID(id: number): Observable<Question[]>{
    let url = this.apiUrl + `?category_id=^${id}$`;
    return this.http.get<Question[]>(url);
  }

  addQuestion(question: Question) {
    return this.http.post<Question>(this.apiUrl, question, httpOptions);
  }

  updateQuestion(question: Question) {
    let url = this.apiUrl + '/' + question.id;
    return this.http.put<Question>(url, question, httpOptions);
  }
}
