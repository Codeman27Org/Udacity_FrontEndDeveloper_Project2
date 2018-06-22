let timerVar;
let gameObject = {cardClass: '', cardId: '', moveCount: 0,timer};

function setTimer() {
  let element = document.getElementById('timer');
  let second = '00';
  let minute = '00';

  element.innerHTML = minute + ':' + second;

  gameObject.timer = setInterval(() => {
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
  clearInterval(gameObject.timer);
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
    }
    else {
      currentGameBoard.push(cardArray[randomNum]);
    }
  }

  currentGameBoard.forEach((val, index) => {
    let cardElement = '<div id="'+index+'" class="card-item '+val+'" onclick="matchCards(this)"><img class="card-image" src="img/'+ val +'.png" /></div>';
    containerElement.insertAdjacentHTML('beforeend', cardElement);
  });

}

function updateMoves() {
  let moveCounter = document.getElementById('move-count');
  gameObject.moveCount++;
  console.log(gameObject.moveCount);
  moveCounter.innerHTML = gameObject.moveCount;
}

function matchCards(obj) {
  if(gameObject.cardClass === '') {
    gameObject.cardClass = obj.className.split(' ')[1];
    gameObject.cardId = obj.id;
  }
  else {
    updateMoves();
    //Is a match
    if(obj.className.split(' ')[1] === gameObject.cardClass && obj.id !== gameObject.cardId) {
      gameObject.cardClass = '';
      gameObject.cardId = '';
      alert('A match!');
    }
    //Not a match
    else {
      gameObject.cardClass = '';
      gameObject.cardId = '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  shuffleCards();
  setTimer();
});
