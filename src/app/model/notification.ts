import { User } from "./user";

export class Notification {
    id_notification: number = 0;
    message: string = '';
    estLu: boolean = false;
    creationDate: Date = new Date();
    destinataire: User = new User();
}
