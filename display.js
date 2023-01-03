export class display {     
    constructor(){}

    displayQuestion (text) {
        var question2Answer = document.getElementById('question');
        // @ts-ignore
        question2Answer.innerHTML = text;
    }

    displayOptions (choices, callback){
        var optionsContainer =  document.getElementById('multipleOptions');
        // @ts-ignore
        optionsContainer.innerHTML = '';

        for (let i=0; i<choices.length; i++){
            const button = document.createElement('button');
            button.innerHTML = choices[i];
            button.className = 'button';
            
            button.addEventListener('click', () => callback(choices[i]));

            // @ts-ignore
            optionsContainer.append(button);
        }
    }

    displayScore(score){
        const displayFinalCard = document.getElementById('quiz');
        //@ts-ignore
        displayFinalCard.innerHTML = "";

        const displayGameOverHTML = document.createElement('h3');
        displayGameOverHTML.innerHTML = 'Game Over'

        const displayScoreHTML = document.createElement('p');
        displayScoreHTML.innerHTML = 'Your score: ' + score;

        // @ts-ignore
        displayFinalCard.append(displayGameOverHTML);
        //@ts-ignore
        displayFinalCard.append(displayScoreHTML);

        const createHighScoreButton = document.createElement ('button');
        createHighScoreButton.innerHTML = 'Save your score'
        displayFinalCard.append(createHighScoreButton);

        createHighScoreButton.addEventListener('click', ()=>{
            const registerHighScore = document.getElementById('quiz');
            registerHighScore.style = ('display: flex; flex-direction: column; align-items: center');
            //@ts-ignore
            registerHighScore.innerHTML = "";
    
            const userInfo = document.createElement ('input');
            userInfo.innerHTML= 'Type your complete name';
            userInfo.style = ('width: 450px; height: 35px; border: 2px solid purple; border-radius: 4px; background-color: rgb(161, 142, 161); color: white');
            registerHighScore.append(userInfo);
            userInfo.setAttribute('placeholder','Type your complete name here');

            const saveButton = document.createElement('button');
            saveButton.innerHTML = 'Save your info';
            registerHighScore.append(saveButton);
            saveButton.addEventListener('click', ()=>{
                localStorage.setItem(userInfo.value, score);
                const saveDisplay = document.getElementById('results');
                const saveSuccessfully = document.createElement('p');
                saveSuccessfully.innerHTML = 'Your info has been saved successfully, go to ViewHighscores section';
                saveDisplay.append(saveSuccessfully);
                setTimeout(()=>{
                    saveSuccessfully.innerHTML = '';
                },3000) 
            })
        });
        
    }

    displayCheckAnswer(boolean){
        var result = document.getElementById('results');
        if (boolean){
            // @ts-ignore
            result.innerHTML = 'Correct!';
        }
        else{
            // @ts-ignore
            result.innerHTML = 'Incorrect!';
        }
    }
}

export function render(Quiz, Display){
    if (Quiz.gameOver()){
        Display.displayScore(Quiz.score);
    }
    else {
        Display.displayQuestion(Quiz.indexQuestion().question);
        Display.displayOptions(Quiz.indexQuestion().choices, (userChoice) =>{ 
            Quiz.answeredQuestion(userChoice);
            render(Quiz, Display);
            Display.displayCheckAnswer(Quiz.checkAnswer);
            setTimeout(() => {
            var result = document.getElementById('results');
            // @ts-ignore
            result.innerHTML = '';}
            ,1000);            
        });
    }
}