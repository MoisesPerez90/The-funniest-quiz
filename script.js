//https://www.youtube.com/watch?v=t_2PI3fHp_I
//@ts-check
//import {countdownTimer} from "./countdownTimer.js";
import {quiz} from "./quiz.js";
import {questions} from "./questions.js";
import {display} from "./display.js";
import {render} from "./display.js";
var highscoresButton = document.getElementById('highscoresView');

function frontpage (callback){
    const portada = document.getElementById('question');
    //@ts-ignore
    portada.innerHTML = 'Coding Quiz Challenge';

    const portadaRules = document.getElementById('multipleOptions');
    const portadaDisplayRules = document.createElement('p');
    portadaDisplayRules.innerHTML = 'Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your answertime by ten seconds!';
    //@ts-ignore
    portadaRules.append(portadaDisplayRules);

    const startButton = document.createElement('button');
    startButton.innerHTML = 'Start'
    //@ts-ignore
    portadaRules.append(startButton);

    const clock = document.getElementById('time');
    // @ts-ignore
    clock.innerHTML= '60';

    startButton.addEventListener('click', main); 
       
}

function seeHighScores (){
    // @ts-ignore
    highscoresButton.addEventListener('click', ()=>{
        var storedItems = window.localStorage;
        var index = document.getElementById('quiz');
        // @ts-ignore
        index.innerHTML='';
        for (var i=0; i<storedItems.length; i++){
            var itemNames = localStorage.key(i);
            // @ts-ignore
            var getValues = localStorage.getItem(itemNames); 
            var displayStorageNames = document.createElement('h2');
            // @ts-ignore
            displayStorageNames.innerHTML = 'User: ' + itemNames;
            var displayStorageValues = document.createElement('h3');
            // @ts-ignore
            displayStorageValues.innerHTML = 'Higher grade: ' + getValues;
            // @ts-ignore
            index.append(displayStorageNames);
            // @ts-ignore
            index.append(displayStorageValues);            
        }

        var buttonHome = document.createElement('button');
        buttonHome.innerHTML = 'Return to home';
        //@ts-ignore
        index.append(buttonHome);
        buttonHome.addEventListener('click', () =>
            window.location.reload()
        );
    })
}

function main (){
    var Quiz = new quiz (questions);
    var Display = new display();
    var setTime = document.getElementById('time');
    let timeSeconds = 60;
    const countDown = setInterval (()=>{
        timeSeconds-=1;
        if (timeSeconds > 0){
            render(Quiz, Display);
            //@ts-ignore
            setTime.innerHTML = timeSeconds;
        }
        if (timeSeconds <= 0 || Quiz.gameOver()){
            clearInterval(countDown);
            //@ts-ignore
            setTime.innerHTML = 'Time out';
            Display.displayScore(Quiz.score);
        }
        if (Quiz.checkAnswer == false){
            timeSeconds-=10;
            Quiz.checkAnswer = true;
        }
    },1000)
}

frontpage();
seeHighScores();