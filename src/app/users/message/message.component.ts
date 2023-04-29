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
  currentUser!: User;
  users: User[] = [];
  selectedUser!: User;
  messages: Message[] = [];
  messageContent = '';
  webSocket!: WebSocketSubject<any>;
  newMessageContent!: string;
  messageForm!: FormGroup;
  selectedRecipientId!: number;

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
      this.webSocket = this.webSocketService.connect(
        url
      ) as WebSocketSubject<any>;

  
    this.messageForm = this.formBuilder.group({
      recipientId: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  }
  loadMessages(): void {
    this.messageService.getMessages().subscribe(
      (messages) => {
        this.messages = messages;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onUserSelect(user: User): void {
    this.selectedUser = user;
    if (this.selectedUser && this.selectedUser.email) {
      this.messageService.getMessagesWithRecipient(this.selectedUser.email)
        .subscribe((messages) => {
          this.messages = messages;
          if (messages.length > 0) {
            this.selectedRecipientId = messages[0].recipientId;
          }
        });
    }
  }
  

  ngOnDestroy(): void {
    this.webSocket.complete();
  }


  onSubmit() {
    if (!this.selectedRecipientId) {
      console.log('No recipient selected!');
      return;
    }
    const message: Message = {
      id: this.currentUser.id,
      senderUsername: this.currentUser.firstname,
      recipientId: this.selectedRecipientId,
      content: this.messageForm.value.content,
      createdAt: new Date(),
      recipientUsername: this.selectedUser && this.selectedUser.email ? this.selectedUser.email : '',
    };
  
    // Envoi du message à l'aide du service MessageService
    this.messageService.sendMessage(message).subscribe(
      (response: Message) => {
        console.log('Message sent successfully: ', response);
  
        // Ajouter le nouveau message à la liste des messages
        const newMessage: Message = {
          id: response.id,
          senderUsername: response.senderUsername,
          recipientId: response.recipientId,
          content: response.content,
          createdAt: response.createdAt,
          recipientUsername: response.recipientUsername,
        };
        this.messages.push(newMessage);
  
        // Effacer le formulaire
        this.messageForm.reset();
  
        // Envoyer le message via le webSocket
        this.webSocket.next(response);
      },
      (error) => {
        console.error('Failed to send message: ', error);
      }
    );
  }
  
}
