let timerVar;

function setTimer() {
  let element = document.getElementById('timer');
  let second = '00';
  let minute = '00';
  element.innerHTML = minute + ':' + second;

  function timer() {
    second++;
    second = second < 10 ? '0' + second : second;
    if(second >= 60) {
      second = '00';
      minute++;
      minute = minute < 10 ? '0' + minute : minute;
    }
    element.innerHTML = minute + ':' + second;
  }
  timerVar = setInterval(timer, 1000)
}

function restartGame() {
  clearInterval(timerVar);
  setTimer();
}

document.addEventListener('DOMContentLoaded', () => {
  let restartButton = document.getElementById('restart-button');

  setTimer();
  restartButton.addEventListener('click', restartGame);
})
