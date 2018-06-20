let timerVar;

function setTimer() {
  let element = document.getElementById('timer');
  let second = '00';
  let minute = '00';

  element.innerHTML = minute + ':' + second;

  timerVar = setInterval(() => {
    second++;
    second = second < 10 ? '0' + second : second;
    if(second >= 60) {
      second = '00';
      minute++;
      minute = minute < 10 ? '0' + minute : minute;
    }
    element.innerHTML = minute + ':' + second;
  }, 1000)
}

function restartGame() {
  clearInterval(timerVar);
  setTimer();
  shuffleCards();
}

function shuffleCards() {
  var containerElement = document.querySelector('.card-container');
  let cardArray = ['football', 'basketball', 'dumbbell', 'baseball', 'ping_pong', 'medal', 'basketball_hoop', 'pool'];
  let currentGameBoard = [];

  //Wipe out the board state for when the restart button is pressed
  containerElement.innerHTML = '';

  while(cardArray.length > 0) {
    let randomNum = Math.floor(Math.random() * cardArray.length);

    if(currentGameBoard.includes(cardArray[randomNum])) {
      currentGameBoard.push(cardArray[randomNum]);
      cardArray.splice(randomNum, 1);
    } else {
      currentGameBoard.push(cardArray[randomNum]);
    }
  }

  currentGameBoard.forEach((val) => {
    let cardElement = '<div class="card-item"><img class="card-image '+ val +'" src="img/'+ val +'.png" /></div>';
    containerElement.insertAdjacentHTML('beforeend', cardElement);
  });

}

document.addEventListener('DOMContentLoaded', () => {
  let restartButton = document.getElementById('restart-button');

  shuffleCards();
  setTimer();
  restartButton.addEventListener('click', restartGame);
})
