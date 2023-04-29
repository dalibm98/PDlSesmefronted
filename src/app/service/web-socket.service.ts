import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private subject!: Subject<MessageEvent>;

  constructor() { }

  connect(url: string): Subject<MessageEvent> {
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
