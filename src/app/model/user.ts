import { Question } from "./question";
import { Reponse } from "./reponse";
import { Token } from "./token";
import { Notification } from "./notification";
import { RoleEnum } from "./role-enum";

export class User {

     id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    role?: RoleEnum;
    tokens?: Token[];
    notifications?: Notification[];
    questions?: Question[];
    reponses?: Reponse[];
}
