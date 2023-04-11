import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomaineQuestion } from '../model/domaine-question';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DomaineQuestionService {
  private apiUrl = 'http://localhost:8081/api/domaine-questions';
  
  constructor(private http: HttpClient) {}
  
  getAllDomaineQuestions(): Observable<DomaineQuestion[]> {
    return this.http.get<DomaineQuestion[]>(`${this.apiUrl}`);
  }
  
  getDomaineQuestionById(id: number): Observable<DomaineQuestion> {
    return this.http.get<DomaineQuestion>(`${this.apiUrl}/${id}`);
  }
  
  createDomaineQuestion(domaineQuestion: DomaineQuestion): Observable<DomaineQuestion> {
    return this.http.post<DomaineQuestion>(`${this.apiUrl}`, domaineQuestion);
  }
  
  updateDomaineQuestion(id: number, domaineQuestion: DomaineQuestion): Observable<DomaineQuestion> {
    return this.http.put<DomaineQuestion>(`${this.apiUrl}/${id}`, domaineQuestion);
  }
  
  deleteDomaineQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
