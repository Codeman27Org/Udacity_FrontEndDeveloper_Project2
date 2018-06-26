let gameObject = {currentCardClass: '', currentCardId: '', moveCount: 0,timer, flippedCards: []};

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
  updateMoves('reset');
  setTimer();
  shuffleCards();
}

function flipCard(obj, ) {
  console.log(obj);
  obj.classList.add('flip');
  gameObject.flippedCards.push(obj.id);
  console.log(gameObject.flippedCards);
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
    let cardElement = '<div id="'+index+'" class="card-item '+val+'" onclick="matchCards(this)">' +
                          '<div class="card-back"> <img class="card-image" src="img/'+ val +'.png" /></div>' +
                          '<div class="card-front"></div>'
                      '</div>';

    containerElement.insertAdjacentHTML('beforeend', cardElement);
  });
}

function win() {
  clearInterval(gameObject.timer);
  alert('Victory!');
}

function checkForWin() {
  totalMatches = document.getElementsByClassName('matched');
  if(totalMatches.length == 16) {
    win();
  }
}

function correctCardMatch(obj) {
  console.log('A match!');
  let matchedCards = document.getElementsByClassName(obj.className);
  Array.from(matchedCards).forEach((val, index) => {
    matchedCards[index].onclick = null;
    matchedCards[index].classList.add('matched');
  })
  checkForWin();
  //2nd card has been selected, clear previous card choice
  gameObject.currentCardClass = '';
  gameObject.currentCardId = '';
}

function updateMoves(resetArg) {
  let moveCounter = document.getElementById('move-count');
  if(resetArg !== 'reset') {
    gameObject.moveCount++;
  }
  else {
    gameObject.moveCount = 0;
  }
  moveCounter.innerHTML = gameObject.moveCount;
}

function matchCards(obj) {
  flipCard(obj);
  if(gameObject.currentCardClass === '') {
    gameObject.currentCardClass = obj.className.split(' ')[1];
    gameObject.currentCardId = obj.id;
  }
  else {
    //Is a match
    if(obj.className.split(' ')[1] === gameObject.currentCardClass && obj.id !== gameObject.currentCardId) {
      updateMoves();
      correctCardMatch(obj);
    }
    //Not a match
    else if(obj.id !== gameObject.currentCardId) {
      updateMoves();
      gameObject.currentCardClass = '';
      gameObject.currentCardId = '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  shuffleCards();
  setTimer();
});
