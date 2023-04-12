import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../model/question';
import { Reponse } from '../model/reponse';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = 'http://localhost:8081/api/questions';

  constructor(private http: HttpClient) { }

  poserQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.baseUrl}`, question);
  }

  repondreQuestion(questionId: number, reponse: Reponse): Observable<Reponse> {
    return this.http.post<Reponse>(`${this.baseUrl}/${questionId}/reponses`, reponse);
  }

  consulterQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}`);
  }

  consulterReponses(questionId: number): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(`${this.baseUrl}/${questionId}/reponses`);
  }
}
