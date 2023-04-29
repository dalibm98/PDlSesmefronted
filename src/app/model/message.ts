export interface Message {

    id: number;
  senderUsername: string;
  recipientId: number;
  recipientUsername: string;
  content: string;
  createdAt: Date;
}
