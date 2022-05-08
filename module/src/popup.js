'use strict';

export default class PopUp {
  constructor() {
    this.gamePopup = document.querySelector('.pop-up');
    this.gamePopupMsg = document.querySelector('.pop-up__msg');
    this.gamePopupRefresh = document.querySelector('.pop-up__refresh');
    this.gamePopupRefresh.addEventListener('click', () => {
      this.onClick && this.onClick();
      hide();
    })
  }

  setClickListener(onClick){
    this.onclick = onClick;
  }

  showWithText(text){
    this.gamePopupMsg.innerText = text;
    this.gamePopup.classList.remove('hide');
  };


  hide(){
    this.gamePopup.classList.add('hide');
  }
  
}