'use strict';

const FLOWER_SIZE = 100;
const FLOWER_COUNT_DASIY = 7;
const FLOWER_COUNT_IRIS = 8;
const MOLE_SIZE = 70;
const MOLE_COUNT = 10;
const GAME_DURATION_SEC = 20;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const gameStartBtn = document.querySelector('.game__start__btn');
const startPopup = document.querySelector('.game__start__pop-up');
const timerBox = document.querySelector('.game__timer');
const gameTimer = document.querySelector('.timer');
const clock = document.querySelector('.clock');
const scoreBox = document.querySelector('.game__score');
const gamePopup = document.querySelector('.pop-up');
const gamePopupMsg = document.querySelector('.pop-up__msg');
const gamePopupRefresh = document.querySelector('.pop-up__refresh');

const moleSound = new Audio('./sound/mole_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const flowerSound = new Audio('./sound/flower_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click', onFieldClick);

//start 버튼 클릭시
gameStartBtn.addEventListener('click', gameStart);
function gameStart(){
  console.log('start!');
  if(started){
    stopGame();
  } else {
    startGame();
  }
  // started = !started;

};

// game진행 후 : stop 버튼 클릭시 -> replay popup - replay 버튼 
gamePopupRefresh.addEventListener('click', gameReStart);
function gameReStart(){
  gameStart();
  showPlayButton();
  gamePopup.classList.add('hide');
};

function startGame (){
  started = true;
  gameInit();
  showStopButton();
  showTimerAndScore();
  hiddenStartPopup();
  startGameTimer();
  clock.classList.remove('stop');
  playSound(bgSound);
};
function stopGame (){
  started = false;
  stopGameTimer();
  hideGameButton();
  showPopUpWithText('REPLAY?🧚🏻‍♀️');
  playSound(alertSound);
  stopSound(bgSound);
  clock.classList.add('stop');
};
function finishGame(win){
  started = false;
  hideGameButton();
  clock.classList.add('stop');
  if(win){
    playSound(winSound);
  } else{
    playSound(flowerSound);
  }
  stopGameTimer();
  stopSound(bgSound);
  showPopUpWithText(win? 'YOU WIN🥳' : 'YOU LOST😢')
}

function showStopButton (){
  const BtnIcon = document.querySelector('.fa-solid');
  BtnIcon.classList.remove('fa-play');
  BtnIcon.classList.add('fa-stop');
};
function showPlayButton (){
  gameStartBtn.style.visibility = 'visible';
}
function hideGameButton(){
  gameStartBtn.style.visibility = 'hidden';
};
function showTimerAndScore(){
  timerBox.style.visibility = 'visible';
  scoreBox.style.visibility = 'visible';
};
function hiddenStartPopup (){
  startPopup.style.visibility = 'hidden';
};

//timer
function startGameTimer (){
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if(remainingTimeSec <= 0){
      clearInterval(timer);
      gameTimer.innerText = `TIME OUT!!😱`;
      finishGame(MOLE_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000)
};
function stopGameTimer(){
  clearInterval(timer);
};
function updateTimerText(time){
  const min = Math.floor(time / 60);
  const sec = time % 60;
  gameTimer.innerText = `${min}:${sec}`
}

function showPopUpWithText(text){
  gamePopupMsg.innerText = text;
  gamePopup.classList.remove('hide');
};
function onFieldClick(e){
  // console.log(e);
  if(!started){
    return
  };
// console.log(e);
  const target = e.target;
  if(target.matches('.mole')){
    //mole
    target.remove();
    score++;
    playSound(moleSound);
    updateScroeBox();
    if(score == MOLE_COUNT){
      finishGame(true);
    }
  } else if (target.matches('.flower')){
    //flower
    finishGame(false)
  }
};

function updateScroeBox(){
  scoreBox.innerText = MOLE_COUNT - score;
};

// field안 아이템 추가 
function gameInit(){
  score = 0;
  field.innerHTML = '';
  scoreBox.innerText = MOLE_COUNT;
  addImgItem('flower', FLOWER_COUNT_DASIY, 'img/flower_daisy.png');
  addImgItem('flower', FLOWER_COUNT_IRIS, 'img/flower_iris.png');
  addImgItem('mole', MOLE_COUNT, 'img/mole.png');
};

function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound){
  sound.pause();
}
function updateScroeBoard(){
  gameScore.innerText = CARROT_COUNT - score;
}

function addImgItem(className, count, imgPath){
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - FLOWER_SIZE;
  const y2 = fieldRect.height - FLOWER_SIZE;
  
  for(let i = 0; i < count; i++){
    const imgItem = document.createElement('img');
    imgItem.setAttribute('class', className);
    imgItem.setAttribute('src', imgPath);
    imgItem.style.position = 'absolute';

    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);

    imgItem.style.left = `${x}px`;
    imgItem.style.top = `${y}px`;

    field.appendChild(imgItem);
  }
};

function randomNumber(min, max){
  return Math.random() * (max - min) + min;
};


const hammer = document.querySelector('.hammer');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  hammer.style.left = `${x}px`;
  hammer.style.top = `${y}px`;
})