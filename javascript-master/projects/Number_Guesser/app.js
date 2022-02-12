/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

// console.log(winningNum);
   
// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessInput = document.querySelector('#guess-input'),
      guessBtn = document.querySelector('#guess-btn'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
   if(e.target.className === 'play-again') {
      window.location.reload();
   }
});

// Listen for guess Button
guessBtn.addEventListener('click', function(){
   let guess = parseInt(guessInput.value);

   //Validate
   if(isNaN(guess) || guess < min || guess > max) {
      setMessage(`Please Enter a number between ${min} and ${max}`, 'red');
   }

   //check if won
   if(guess === winningNum) {
      //Game Over - Won
      gameOver(true, `${winningNum} is correct, YOU WON`);

   } else {
      //Wrong Number
      guessesLeft -= 1;
      if(guessesLeft === 0) {
         //Game Over - lost
         gameOver(false, `Game Over - You Lost. The Correct number was ${winningNum}`);

      } else {
         // Game Contiunes - answer Wrong

         //change border color
         guessInput.style.borderColor = 'red';

         //clear Input
         guessInput.value = '';

         // Tell User it is the wrong number
         setMessage(`${guess} is not correct, ${guessesLeft}: guesses left`, 'red');
      }
   }
});

//Game Over (WON or LOST)
function gameOver(won, msg) {
   let color;
   won === true ? color = 'green' : color = 'red';

   //Disable Input
   guessInput.disabled = true;
   //change border color
   guessInput.style.borderColor = color;
   //Set Text Color
   message.style.color = color;
   //Set Message
   setMessage(msg);

   //Play Again
   guessBtn.value = 'Play Again';
   guessBtn.className += 'play-again'

   
}

//Get Winning Num
function getRandomNumber(min, max) {
   return Math.floor(Math.random()*(max-min+1)+min);
}

//Set Message
function setMessage(msg, color) {
   message.style.color = color;
   message.textContent = msg;
}