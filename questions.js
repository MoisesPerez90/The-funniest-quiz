import { myQuestions } from "./datos.js";
 
export class generateQuestion {
    /**
     * 
     * @param {string} question this is the question that'll be displayed
     * @param {string[]} choices this contains the different possible answers for the question 
     * @param {string} answer this is the correct answer of the question
     */
    constructor(question, choices, answer){
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }

    /**
     * 
     * @param {string} answer this'll check the user's answer
     * @returns {boolean}   return if the user's answer is correct
     */
    checkAnswer(answer){
        var result = answer === this.answer;
        return result;
    }
}

export var questions= [];

for (var element in myQuestions){
    var x = new generateQuestion(myQuestions[element].question, myQuestions[element].possibleAnswers, myQuestions[element].correctAnswer);
    questions.push(x);
}



