//@ts-check
import {generateQuestion} from "./questions.js";

export class quiz {
   /**
    * 
    * @param {generateQuestion[]} questions All the questions and anwers that will be displayed
    */
    constructor(questions){
        this.questions = questions;
    }

    score = 0
    index = 0
    checkAnswer = true;

    /**
     * 
     * @returns {generateQuestion}
     */
    indexQuestion (){
        return this.questions[this.index];
    }

    /**
     * 
     * @param {string} answer validates the answer
     */
    answeredQuestion (answer){
        if (this.indexQuestion().checkAnswer(answer)){
            this.score++;
            this.checkAnswer = true;
        }
        else{
            this.checkAnswer = false;
        }
        this.index++;
    }

    gameOver (){
        return this.questions.length === this.index
    }

}





 

