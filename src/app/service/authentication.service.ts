import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { RegisterRequest } from '../model/register-request';
import { AuthenticationResponse } from '../model/authentication-response';
import { AuthenticationRequest } from '../model/authentication-request';
import { User } from '../model/user';
import { Question } from '../model/question';
import { Reponse } from '../model/reponse';
import { UserStats } from '../model/user-stats';
import { Notif } from '../model/notif';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8081/api/v1/auth';
  private authTokenKey = 'authToken';

  private baseUrl = '/api/v1/auth';
  constructor(private http: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerRequest);
  }

  authenticate(
    authenticationRequest: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${this.apiUrl}/authenticate`,
      authenticationRequest
    );
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
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + authToken
    );
    return this.http.get<User>(`${this.apiUrl}/current-user`, { headers });
  }

  addReponse(questionId: number, reponse: Reponse): Observable<Reponse> {
    const url = `${this.apiUrl}/questions/${questionId}/reponses`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      }),
    };
    return this.http.post<Reponse>(url, reponse, httpOptions);
  }

  getMeilleuresReponsesTrieParVotes(): Observable<Reponse[]> {
    const url = `${this.apiUrl}/reponses/meilleures`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getAuthToken()}`,
      }),
    };
    return this.http.get<Reponse[]>(url, httpOptions);
  }


  modifyQuestion(questionId: number, question: any): Observable<any> {
    const url = `${this.apiUrl}/questions/${questionId}`;
    const authToken = this.getAuthToken();

    if (!authToken) {
      console.error('Authentication token is undefined');
      return throwError('Authentication token is undefined');
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }),
    };

    return this.http.put(url, question, httpOptions).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  deleteQuestion(questionId: number): Observable<any> {
    const authToken = this.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + authToken
      );
      const url = `${this.apiUrl}/questions/${questionId}`;
      return this.http.delete(url, { headers });
    }
    return throwError('Authentication required to delete a question');
  }

  addQuestion(question: Question): Observable<User> {
    const authToken = this.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + authToken
      );
      return this.http.post<User>(`${this.apiUrl}/questions`, question, {
        headers,
      });
    }
    return throwError('Authentication required to add a question');
  }

  markNotificationAsRead(notificationId: number): Observable<Notif> {
    const authToken = this.getAuthToken();
    if (authToken) {
      const headers = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + authToken
      );
      return this.http.put<Notif>(
        `${this.apiUrl}/notifications/${notificationId}`,
        null
      );
    }
    return throwError('Authentication required to add a question');
  }

  getNotifications(): Observable<Notif[]> {
    return this.http.get<Notif[]>(`${this.apiUrl}/notifications`);
  }

  getQuestionsWithReponses(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions-with-reponses`);
  }

  getUserStats(userId: number): Observable<UserStats> {
    const url = `${this.apiUrl}/${userId}/stats`;
    return this.http.get<UserStats>(url);
  }

  
  modifyUser(
    userId: number,
    user: User,
    options: { headers?: HttpHeaders } = {}
  ): Observable<User> {
    const url = `${this.apiUrl}/users/${userId}`;
    const headers = options.headers ?? new HttpHeaders();
    return this.http.put<User>(url, user, { headers });
  }

  getMyReponses(): Observable<Reponse[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.get<Reponse[]>(this.apiUrl + '/my-reponses', {
      headers: headers,
    });
  }

  modifyReponse(reponseId: number, reponse: Reponse): Observable<any> {
    const authToken = this.getAuthToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + authToken
    );
    return this.http.put<any>(
      `${this.apiUrl}/reponses/${reponseId}`,
      reponse,
      { headers }
    );
  }

  deleteAnswer(questionId: number, reponseId: number): Observable<any> {
    const authToken = this.getAuthToken();
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + authToken
    );
    return this.http.delete<any>(
      `${this.apiUrl}/questions/${questionId}/reponses/${reponseId}`,
      { headers }
    );
  }

  voteForReponse(reponseId: number): Observable<void> {
    const url = `${this.apiUrl}/${reponseId}/vote`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getAuthToken()}`
      })
    };

    return this.http.put<void>(url, null, httpOptions);
  }

  // ...

  /*
    deleteAnswer(questionId: number, answerId: number): Observable<any> {
    const authToken = this.authService.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + authToken);
    return this.http.delete(${this.apiUrl}/questions/${questionId}/reponses/${answerId}, { headers });
    } 
    */
}
