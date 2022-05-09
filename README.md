![ogImg](https://user-images.githubusercontent.com/66510673/167299967-14b1a632-e011-4499-b7a2-125aecb2528f.jpg)
# Catching Moles Game
### **Live Demo :** https://hailie1230.github.io/js_catching_moles/

## **Description**
예쁜 꽃들을 망치는 두더지를 뿅망치로 클릭하여 쫓아내는 게임입니다.

## **How to play**
![01](https://user-images.githubusercontent.com/66510673/167301631-51d8b436-b582-4f42-b953-a1a8ed16fde9.gif)
- 나와있는 두더지를 모두 클릭하면 성공!

![02](https://user-images.githubusercontent.com/66510673/167301649-57a96451-83c2-4a53-929e-cf5dddfd3d01.gif)
- 실수로 꽃을 클릭하면 실패!

![03-2](https://user-images.githubusercontent.com/66510673/167301733-2f9b4163-611e-4972-b988-f758e2733292.gif)
- 실패 시 Replay 팝업의 재 실행 버튼을 클릭하면 게임이 재 실행됩니다.

![04](https://user-images.githubusercontent.com/66510673/167301750-dca46436-4a61-48c4-b031-b5c131c8cd9d.gif)
- 게임 중 stop 버튼 클릭을 하면 새롭게 게임을 재 실행할 수 있습니다.

## **Script**
1. 게임 필드 속에 꽃 2종류와 두더지를 랜덤 배치 하기 
- addImgItem 함수와 randomNumber함수로 필드 안에 아이템이 랜덤 배치 되도록 함
<img width="747" alt="image" src="https://user-images.githubusercontent.com/66510673/167302463-347299b1-640d-4aee-9750-c38300e2658c.png">
- 아이템 랜덤 배치는 위 페이지를 참고 (https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript)

- gameInit 함수를 통해 각각 아이템의 갯수와 이미지 경로를 설정

```
function gameInit(){
  score = 0;
  field.innerHTML = '';
  scoreBox.innerText = MOLE_COUNT;
  addImgItem('flower', FLOWER_COUNT_DASIY, 'img/flower_daisy.png');
  addImgItem('flower', FLOWER_COUNT_IRIS, 'img/flower_iris.png');
  addImgItem('mole', MOLE_COUNT, 'img/mole.png');
};
```

2. 게임 시작 하기
```
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

```

3. 게임 타이머 만들기 
- setInterval함수를 활용하여 타이머 생성하고, 게임이 멈췄을때 타이머도 멈춰야 하므로 clearInterval을 활용하여 stopGameTimer 함수를 만든다.
- 전역 변수에서 let timer = undefined;로 정의 후 지역 변수에서 setInterval 함수를 timer에 재 정의 함으로써 밖에서도 clearInterval이 가능하도록 구현

```
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
```

4. 꽃 또는 두더지를 클릭 했을때 이벤트 처리 
- 이벤트 위임으로 game Field(부모노드) 자체에 addEventListener를 등록하여 Click에 대한 동일한 로직을 처리
```
field.addEventListener('click', onFieldClick);
```


5. 사운드 효과 추가 하기 
- 게임 Playing 사운드, 두더지 클릭시 사운드, 꽃 클릭시 사운드, 버튼 클릭시 사운드 등 필요한 사운드를 변수로 지정뒤 playSound, stopSound 함수를 만든다.

```
function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound){
  sound.pause();
}
```

## Future scope
- 스크립트 코드 class화 하여 정리하기
- 두더지가 랜덤하게 움직이도록 구현하기 
