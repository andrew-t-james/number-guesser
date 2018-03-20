'use strict';

(function () {
  var formInput = document.querySelector('#form-input');
  var guessButton = document.querySelector('#guess-button');
  var guessForm = document.querySelector('#guess-form');
  var clearButton = document.querySelector('#clear-button');
  var resetButton = document.querySelector('#reset-button');
  var numberGuess = document.querySelector('#number-guess');
  var rangeGuess = document.querySelector('#range-guess');
  var announcement = document.querySelector('#announcement');
  var allButtons = document.querySelectorAll('button, input[type=button]');
  var number = Math.floor(Math.random() * 100) + 1;

  /**
   * @function enableButtons
   * @description enables form buttons and reset button
   */
  var enableButtons = function enableButtons() {
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].removeAttribute('disabled');
    }
  };

  /**
   * @function disableButtons
   * @description disables guess button and clear button
   */
  var disableButtons = function disableButtons() {
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].setAttribute('disabled', true);
      allButtons[i].setAttribute('aria-disabled', true);
    }
  };

  /**
   * @function clearText
   * @param {DOElement} clears elements text from inputs inDom
   */
  var clearText = function clearText(element) {
    return element.innerText = '';
  };

  /**
   * @function clearInput
   * @param {DOElement} clears clears input elements text from inDom
   */
  var clearInput = function clearInput(element) {
    return element.value = '';
  };

  /**
   *  @function setText
   * @param {DOElement} element from the DOM to set text on
   * @param {String} text string to be set in the DOM
   */
  var setText = function setText(element, text) {
    return element.innerText = text;
  };

  /**
   * @function resetGame
   * @description resets game back to initial state
   */
  var resetGame = function resetGame() {
    setText(announcement, 'Guess a number between 1 and 100');
    clearInput(formInput);
    clearText(numberGuess);
    clearText(rangeGuess);
    number = Math.floor(Math.random() * 100) + 1;
    disableButtons();
  };

  /**
   * @function countDown
   * @description sets an one second interval for countdown to display in UI
   * @param {Number} i initiate setInterval and display countdown in UI
   */
  var countDown = function countDown(i) {
    // used to clear Interval so that integer can be set and cleared on every win
    var int = setInterval(function () {
      setText(announcement, 'New Game begins in:');
      setText(numberGuess, i);
      i-- || clearInterval(int);

      if (i === -1) {
        resetGame();
      }
    }, 1000);
  };

  /**
   * @function checkWin
   * @description checks for win, if number matches guess winning message is displayed and game is rest
   */
  var checkWin = function checkWin() {
    var guess = parseInt(formInput.value);
    if (number === guess) {
      clearInput(formInput);
      clearText(announcement);
      setText(numberGuess, 'BOOM!');
      clearText(rangeGuess);
      countDown(3);
    } else {
      setText(numberGuess, 'Your last guess was');
      setText(numberGuess, guess);
      numberGuess.style.visibility = 'visible';
      // ternary to check if number is in range gives error if out of range other wise shows hints about guess
      rangeGuess.innerText = guess < 0 || guess > 100 || isNaN(guess) ? 'That guess of ' + guess + ' is invalid please enter a number from 0 to 100' : guess < number ? 'That is to low' : 'That is to high';
      clearInput(formInput);
    }
  };

  guessButton.addEventListener('click', function () {
    // on click check for a win and disable appropriate buttons
    checkWin();
    disableButtons();
  });

  clearButton.addEventListener('click', function () {
    // on click clear input field and disable all appropriate buttons
    formInput.value = '';
    disableButtons();
  });

  formInput.addEventListener('change', function () {
    // on change event enable all buttons
    enableButtons();
  });

  formInput.addEventListener('keypress', function (e) {
    // prevent 'e' from being entered in number input
    if (e.which === 101) {
      e.preventDefault();
    }
    enableButtons();
  });

  guessForm.addEventListener('keypress', function (e) {
    // if user presses enter key check for win disable buttons and prevent default form behavior
    if (e.which === 13) {
      e.preventDefault();
      disableButtons();
      checkWin();
    }
  });

  resetButton.addEventListener('click', function () {
    // rests the game and disables all buttons
    disableButtons();
    resetGame();
  });
})();