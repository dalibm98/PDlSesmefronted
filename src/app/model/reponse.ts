import { Question } from "./question";
import { User } from "./user";

export class Reponse {

    id_reponse?: number;
    contenu?: string;
    dateCreation?: Date;
    auteur?: User;
    question?: Question;
    vote_utilisateur?: User[];
}