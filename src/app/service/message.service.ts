import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../model/message';

import { AuthenticationService } from './authentication.service';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  private apiBaseUrl = 'http://localhost:8081/api/messages';

  constructor(private http: HttpClient) { }

  public getMessages(): Observable<Message[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthToken());
    return this.http.get<Message[]>(`${this.apiBaseUrl}`, { headers });
  }

  public getMessagesWithRecipient(recipientUsername: number): Observable<Message[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.getAuthToken());
    return this.http.get<Message[]>(`${this.apiBaseUrl}/messages/${recipientUsername}`, { headers });
  }

  sendMessage(message :Message): Observable<Message> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer '+ this.getAuthToken());
    return this.http.post<Message>(`${this.apiBaseUrl}`, { headers });
  }
  

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}



