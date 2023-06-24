import { Question } from "./question";
import { User } from "./user";

export interface Reponse {

    id_reponse: number;
    contenu: string;
    dateCreation: Date;
    auteur: User;
    question: Question;
    vote_utilisateur: User[];
    isVoted: boolean; // Nouvelle propriété pour représenter l'état du vote
    votes : number;
    nombreVotes: number;

    voteCounts?: number
}
