import { DomaineQuestion } from "./domaine-question";
import { NatureQuestion } from "./nature-question";
import { Reponse } from "./reponse";
import { User } from "./user";

export class Question {
    id_question?: number;
    sujet?: string;
    contenu?: string;
    date?: Date;
    auteur?: User;
    reponses?: Reponse[];
    nature?: NatureQuestion;
    domaine?: DomaineQuestion;
    isAnswered?: boolean;
}
