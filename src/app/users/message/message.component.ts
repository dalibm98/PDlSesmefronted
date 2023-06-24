import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/model/message';
import { User } from 'src/app/model/user';
import { MessageService } from 'src/app/service/message.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { WebSocketService } from 'src/app/service/web-socket.service';
import { UserService } from 'src/app/service/user.service';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
  currentUser: User | undefined;
  selectedUser: User | undefined;
  selectedRecipientId: number | undefined;
  users: User[] = [];
  messages: Message[] = [];
  webSocket: WebSocketSubject<any> | undefined;
  messageForm!: FormGroup;
  selectedRecipientIdd :string | undefined;
  constructor(
    private messageService: MessageService,
    private authService: AuthenticationService,
    private service: UserService,
    private webSocketService: WebSocketService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.service.getAllUsers().subscribe((users) => {
      this.users = users;
    });

    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      this.authService.getCurrentUser(authToken).subscribe(
        (user) => {
          this.currentUser = user;
          this.loadMessages();
        },
        (error) => {
          console.log(error);
        }
      );

      const url = 'ws://localhost:8081/ws';
      this.webSocket = this.webSocketService.connect(url) as WebSocketSubject<any>;
    }

    this.messageForm = this.formBuilder.group({
      recipientId: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  loadMessages(): void {
    if (this.currentUser) {
      this.messageService.getMessagesWithRecipient(this.currentUser.id)
        .subscribe(
          (messages) => {
            this.messages = messages;
            if (messages.length > 0) {
              this.selectedRecipientId = messages[0].recipientId;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  onUserSelect(user: User): void {
    this.selectedUser = user;
    console.log(user)
    if (this.selectedUser && this.selectedUser.email) {
      this.messageService.getMessagesWithRecipient(this.selectedUser.id)
        .subscribe((messages) => {
          this.messages = messages;
          if (messages.length > 0) {
            console.log(typeof messages[0].recipientId)
            this.selectedRecipientId = messages[0].recipientId;
            

          }
         console.log(messages)
        });
    }
  }
  ngOnDestroy(): void {
    if (this.webSocket) {
      this.webSocket.complete();
    }
  }


    onSubmit() {
      if (this.currentUser && this.selectedUser) {
    
        const message: Message = {
          recipientId: this.selectedUser.id,
          content: this.messageForm.get('content')?.value ?? '',
          
          
        };
        console.log(this.currentUser)
        console.log(message)
        console.log(this.selectedRecipientId)
        this.messageService.sendMessage(message).subscribe(
          (message) => {
            this.messages.push(message);
            this.messageForm.reset();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
}