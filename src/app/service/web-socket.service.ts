import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private subject!: Subject<MessageEvent>;

  constructor(private authService: AuthenticationService){ }
  private authTokenKey = 'authToken';
  private get authToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  connect(url: string): Subject<MessageEvent> {
    if (!this.authToken) {
      throw new Error('Not authenticated');
    }

    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    this.socket = new WebSocket(url);

    const observable = new Observable(observer => {
      this.socket.onmessage = (event) => {
        observer.next(event);
      }
      this.socket.onerror = (event) => {
        observer.error(event);
      }
      this.socket.onclose = () => {
        observer.complete();
      }
    });

    const observer = {
      next: (data: any) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
