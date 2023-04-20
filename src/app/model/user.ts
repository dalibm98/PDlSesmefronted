import { Question } from "./question";
import { Reponse } from "./reponse";
import { Token } from "./token";
import { Notification } from "./notification";
import { RoleEnum } from "./role-enum";
import { UserStats } from "./user-stats";

export interface User {

     id: number;
    firstname: string;
    lastname: string;
    email?: string;
    password?: string;
    adresse :string
    status: string;
    description: string;
    role?: RoleEnum;
    tokens?: Token[];
    notifications?: Notification[];
    questions?: Question[];
    reponses?: Reponse[];
    stats?: UserStats; // l'opérateur '?' signifie que la propriété est facultative

}
