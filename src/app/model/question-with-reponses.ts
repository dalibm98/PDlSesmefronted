import { Question } from "./question";
import { Reponse } from "./reponse";

export class QuestionWithReponses {

    question: Question;
    reponses: Reponse[];

    constructor(question: Question, reponses: Reponse[]) {
        this.question = question;
        this.reponses = reponses;
    }
}
