'use strict';

(function () {
  var userGuessInput = document.querySelector('#user-input');
  var minInput = document.querySelector('#min-input');
  var maxInput = document.querySelector('#max-input');
  var guessButton = document.querySelector('#guess-button');
  var guessForm = document.querySelector('#guess-form');
  var clearButton = document.querySelector('#clear-button');
  var resetButton = document.querySelector('#reset-button');
  var userGuess = document.querySelector('#number-guess');
  var rangeGuess = document.querySelector('#range-guess');
  var announcement = document.querySelector('#announcement');
  var buttonList = document.querySelectorAll('button, input[type=button]');
  var minNumber = 1;
  var maxNumber = 100;
  var number = getRandomNumber(minNumber, maxNumber);

  function getRandomNumber(min, max) {
    // console.log(Math.floor(Math.random() * (max - min + 1)) + min);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  /**
   * @function enableButtons
   * @description enables form buttons and reset button
   */
  function enableButtons() {
    for (var i = 0; i < buttonList.length; i++) {
      buttonList[i].removeAttribute('disabled');
      buttonList[i].setAttribute('aria-disabled', false);
    }
  }

  /**
   * @function disableButtons
   * @description disables guess button and clear button
   */
  function disableButtons() {
    for (var i = 0; i < buttonList.length; i++) {
      buttonList[i].setAttribute('disabled', 'disabled');
      buttonList[i].setAttribute('aria-disabled', true);
    }
  }

  /**
   * @function clearText
   * @param {DOMelement} clears elements text from inputs inDom
   */
  function clearText(element) {
    return element.innerText = '';
  }

  /**
   * @function clearInput
   * @param {DOMelement} clears clears input elements text from inDom
   */
  function clearInput(element) {
    return element.value = '';
  }

  /**
   *  @function setText
   * @param {DOMelement} element from the DOM to set text on
   * @param {String} text string to be set in the DOM
   */
  function setText(element, text) {
    return element.innerText = text;
  }

  /**
   * @function resetGame
   * @description resets game back to initial state
   */
  function resetGame() {
    setText(announcement, 'Guess a number between 1 and 100');
    clearInput(userGuessInput);
    clearText(userGuess);
    clearText(rangeGuess);
    number = Math.floor(Math.random() * 100) + 1;
    disableButtons();
  }

  /**
   * @function countDown
   * @description sets an one second interval for countdown to display in UI
   * @param {Number} i initiate setInterval and display countdown in UI
   */
  function countDown(i) {
    // int used to clear Interval so that integer can be set and cleared on every win
    var clearIntervalID = setInterval(function () {
      setText(announcement, 'New Game begins in:');
      setText(userGuess, i);
      i-- || clearInterval(clearIntervalID);

      if (i === -1) {
        resetGame();
      }
    }, 1000);
  }

  /**
   * @function checkWin
   * @description checks for win, if number matches guess winning message is displayed and game is rest
   */
  function checkWin() {
    var guess = parseInt(userGuessInput.value);
    if (number === guess) {
      clearInput(userGuessInput);
      clearInput(minInput);
      clearInput(maxInput);
      clearText(announcement);
      setText(userGuess, 'BOOM!');
      clearText(rangeGuess);
      countDown(3);
    } else {
      setText(userGuess, 'Your last guess was');
      setText(userGuess, guess);
      clearInput(minInput);
      clearInput(maxInput);
      userGuess.style.visibility = 'visible';
      // nested ternary to check if number is in range gives error if out of range other wise shows hints about guess
      rangeGuess.innerText = guess < 0 || guess > 100 || isNaN(guess) ? 'That guess of ' + guess + ' is invalid please enter a number from 0 to 100' : guess < number ? 'That is to low' : 'That is to high';
      clearInput(userGuessInput);
    }
  }

  guessButton.addEventListener('click', function () {
    // on click check for a win and disable appropriate buttons
    checkWin();
    disableButtons();
  });

  clearButton.addEventListener('click', function () {
    // on click clear input field and disable all appropriate buttons
    clearInput(userGuessInput);
    disableButtons();
  });

  userGuessInput.addEventListener('change', function () {
    // on change event enable all buttons
    enableButtons();
  });

  userGuessInput.addEventListener('keypress', function (e) {
    // prevent 'e' from being entered in number input
    if (e.which === 101) {
      e.preventDefault();
    }
    enableButtons();
  });

  guessForm.addEventListener('keypress', function (e) {
    // if user presses enter key check for win disable buttons and prevent default form behavior
    if (e.which === 13) {
      console.log(minInput.value, maxInput.value, number);
      e.preventDefault();
      disableButtons();
      checkWin();
      // call min max function here
    }
  });

  resetButton.addEventListener('click', function () {
    // rests the game and disables all buttons
    disableButtons();
    resetGame();
  });
})();