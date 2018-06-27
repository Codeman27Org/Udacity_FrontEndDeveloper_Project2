let gameObject = {currentCardClass: '', currentCardId: '', moveCount: 0, timer, flippedCards: [], starCount: 3};

function setTimer() {
  let element = document.getElementById('timer');
  let modalElement = document.getElementById('modal-timer');
  let second = '00';
  let minute = '00';

  element.innerHTML = minute + ':' + second;
  modalElement.innerHTML = minute + ':' + second;

  gameObject.timer = setInterval(() => {
    second++;
    second = second < 10 ? '0' + second : second;
    if(second >= 60) {
      second = '00';
      minute++;
      minute = minute < 10 ? '0' + minute : minute;
    }
    element.innerHTML = minute + ':' + second;
    modalElement.innerHTML = minute + ':' + second;

    if(second == '45') {
      updateStars('removeFirstStar');
    }
    if(minute == '01' && second == '15') {
      updateStars('removeSecondStar');
    }
  }, 1000)
}

function restartGame() {
  clearInterval(gameObject.timer);
  updateMoves('reset');
  setTimer();
  shuffleCards();
  updateStars('start');
  closeModal();
}

function flipCard(obj, type) {
  //To prevent clicking on elements while animation is occurring
  function stopClicking(e){
      e.stopPropagation();
      e.preventDefault();
  }

  if(type === 'singleCard') {
    obj.classList.add('flip');
    gameObject.flippedCards.push(obj);
  }
  else if(type === 'unmatchedCard'){
    document.addEventListener('click', stopClicking, true);
    obj.classList.add('flip');
    gameObject.flippedCards.push(obj);
    setTimeout(() => {
      gameObject.flippedCards.forEach((val) =>  {
        val.classList.add('flip-back');
        val.classList.remove('flip');
       })
    }, 500)
    setTimeout(() => {
      gameObject.flippedCards.forEach((val) =>  {
        val.classList.remove('flip-back');
        gameObject.flippedCards = [];
        document.removeEventListener('click', stopClicking, true);
       })
    }, 1250)
  }
  else if(type === 'matchedCard') {
    obj.classList.add('flip');
    gameObject.flippedCards.push(obj);
    setTimeout(() => {
      gameObject.flippedCards.forEach((val) =>  {
        val.firstChild.classList.add('matched');
       })
       gameObject.flippedCards = [];
       checkForWin();
     }, 500)
  }
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
  openModal();
}

function checkForWin() {
  totalMatches = document.getElementsByClassName('matched');
  console.log(totalMatches.length);
  if(totalMatches.length == 16) {
    win();
  }
}

function correctCardMatch(obj) {
  let matchedCards = document.getElementsByClassName(obj.className);
  Array.from(matchedCards).forEach((val, index) => {
    matchedCards[index].onclick = null;
  })
  //2nd card has been selected, clear previous card choice
  gameObject.currentCardClass = '';
  gameObject.currentCardId = '';
}

function updateStars(arg) {
  let starContainer = document.getElementById('star-container');
  let modalStarContainer = document.getElementById('modal_star-container');

  if(arg === 'start') {
    gameObject.starCount = 3;
  }
  else if(arg === 'removeFirstStar' && gameObject.starCount === 3) {
    gameObject.starCount--;
  }
  else if(arg === 'removeSecondStar' && gameObject.starCount === 2) {
    gameObject.starCount--;
  }
  starContainer.innerHTML = '';
  modalStarContainer.innerHTML = '';
  for(let i = 0; i < gameObject.starCount; i++) {
    starContainer.insertAdjacentHTML('beforeend', `<img class="star-image star-${i}" src="img/full_star.png" />`);
    modalStarContainer.insertAdjacentHTML('beforeend', `<img class="star-image star-${i}" src="img/full_star.png" />`);
  }
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
  if(gameObject.moveCount === 13) {
    updateStars('removeFirstStar');
  }
  if(gameObject.moveCount === 16) {
    updateStars('removeSecondStar');
  }
}

function matchCards(obj) {
  if(gameObject.currentCardClass === '') {
    gameObject.currentCardClass = obj.className.split(' ')[1];
    gameObject.currentCardId = obj.id;
    flipCard(obj, 'singleCard');
  }
  else {
    //Is a match
    if(obj.className.split(' ')[1] === gameObject.currentCardClass && obj.id !== gameObject.currentCardId) {
      updateMoves();
      flipCard(obj, 'matchedCard');
      correctCardMatch(obj);
    }
    //Not a match
    else if(obj.id !== gameObject.currentCardId) {
      updateMoves();
      gameObject.currentCardClass = '';
      gameObject.currentCardId = '';
      flipCard(obj, 'unmatchedCard');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  shuffleCards();
  setTimer();
  updateStars('start');
});

//MODAL Functionality
// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function openModal() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
function closeModal() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}
