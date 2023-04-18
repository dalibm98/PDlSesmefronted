import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RegisterRequest } from '../model/register-request';
import { AuthenticationResponse } from '../model/authentication-response';
import { AuthenticationRequest } from '../model/authentication-request';
import { User } from '../model/user';
import { Question } from '../model/question';
import { Reponse } from '../model/reponse';
import { UserStats } from '../model/user-stats';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8081/api/v1/auth';
  private authTokenKey = 'authToken';

  private baseUrl = '/api/v1/auth';
  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest);
  }

  authenticate(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, authenticationRequest);
  }

  storeAuthToken(authToken: string): void {
    localStorage.setItem(this.authTokenKey, authToken);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }
  getCurrentUser(authToken: string | null): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);
    return this.http.get<User>(`${this.apiUrl}/current-user`, { headers });
  }


  addReponse(questionId: number, reponse: Reponse): Observable<Reponse> {
    const url = `${this.apiUrl}/questions/${questionId}/reponses`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      })
    };
    return this.http.post<Reponse>(url, reponse, httpOptions);
  }




  addQuestion(question: Question): Observable<User> {
    const authToken = this.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);
      return this.http.post<User>(`${this.apiUrl}/questions`, question, { headers });
    }
    return throwError('Authentication required to add a question');
  }
  




  markNotificationAsRead(notificationId: number): Observable<Notification> {
    const authToken = this.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);
    return this.http.put<Notification>(`${this.apiUrl}/notifications/${notificationId}`, null);
  }
  return throwError('Authentication required to add a question');
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`);
  }

  getQuestionsWithReponses(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions-with-reponses`);
  }

  getUserStats(userId: number): Observable<UserStats> {
    const url = `${this.apiUrl}/${userId}/stats`;
    return this.http.get<UserStats>(url);
  }

  modifyQuestion(questionId: number, question: any): Observable<any> {
    const url = `${this.apiUrl}/questions/${questionId}`;
    return this.http.put(url, question);
  }

  modifyReponse(reponseId: number, reponse: any): Observable<any> {
    const url = `${this.apiUrl}/reponses/${reponseId}`;
    return this.http.put(url, reponse);
  }

  modifyUser(userId: number, user: any): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.put(url, user);
  }
}


