import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NatureQuestion } from '../model/nature-question';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class NatureQuestionService {
  private apiUrl = 'http://localhost:8081/api/nature-questions';
  
  constructor(private http: HttpClient) {}
  
  getAllNatureQuestions(): Observable<NatureQuestion[]> {
    return this.http.get<NatureQuestion[]>(`${this.apiUrl}`);
  }
  
  getNatureQuestionById(id: number): Observable<NatureQuestion> {
    return this.http.get<NatureQuestion>(`${this.apiUrl}/${id}`);
  }
  
  createNatureQuestion(natureQuestion: NatureQuestion): Observable<NatureQuestion> {
    return this.http.post<NatureQuestion>(`${this.apiUrl}`, natureQuestion);
  }
  
  updateNatureQuestion(id: number, natureQuestion: NatureQuestion): Observable<NatureQuestion> {
    return this.http.put<NatureQuestion>(`${this.apiUrl}/${id}`, natureQuestion);
  }
  
  deleteNatureQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
