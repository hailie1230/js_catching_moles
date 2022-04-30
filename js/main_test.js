'use strict';

const FLOWER_SIZE = 100;
const FLOWER_COUNT_DASIY = 7;
const FLOWER_COUNT_IRIS = 8;
const MOLE_SIZE = 70;
const MOLE_COUNT = 10;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const BtnIcon = document.querySelector('.fa-solid');
const startBtn = document.querySelector('.game__start__btn');
const startPopup = document.querySelector('.game__start__pop-up');
const timerBox = document.querySelector('.game__timer');
const gameTimer = document.querySelector('.timer');
const gameScore = document.querySelector('.game__score');

let score = 0;



//timer 
let time = 10;
let min = '';
let sec = '';
let timerStart = setInterval(function(){
  min = parseInt(time / 60);
  sec = time % 60;

  gameTimer.innerHTML = `${min}:${sec}`;
  time--;

  if(time < 0){
    clearInterval(timerStart);
    gameTimer.innerHTML = `TIME OUT!!😱`;
  }
}, 1000);


//start 버튼 클릭시
startBtn.addEventListener('click', gameStart);
function gameStart(){
  console.log('start!');
  gameInit();
  startPopup.classList.add('hide');
  BtnIcon.classList.remove('fa-play');
  BtnIcon.classList.add('fa-stop');
  timerBox.classList.remove('hide');
  gameScore.classList.remove('hide');
};


// field안 아이템 추가 
function gameInit(){
  score = 0;
  // field.innerHTML = '';
  gameScore.innerText = MOLE_COUNT;
  // console.log(fieldRect);
  addImgItem('flower', FLOWER_COUNT_DASIY, 'img/flower_daisy.png');
  addImgItem('flower', FLOWER_COUNT_IRIS, 'img/flower_iris.png');
  // addImgItem('flower', 5, 'img/flower_tulips.png');
  addImgItem('mole', MOLE_COUNT, 'img/mole.png');
};

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


