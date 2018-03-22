'use strict';

(function () {
  var userGuessInput = document.querySelector('#user-input');
  var minInput = document.querySelector('#min-input');
  var maxInput = document.querySelector('#max-input');
  var guessButton = document.querySelector('#guess-button');
  var guessForm = document.querySelector('#guess-form');
  var minMaxForm = document.querySelector('.guess-form__min-max');
  var clearButton = document.querySelector('#clear-button');
  var resetButton = document.querySelector('#reset-button');
  var userGuess = document.querySelector('#number-guess');
  var rangeGuess = document.querySelector('#range-guess');
  var winCounter = document.querySelector('#win-count');
  var announcement = document.querySelector('#announcement');
  var buttonList = document.querySelectorAll('button, input[type=button], input[type=submit]');
  var minNumber = 1;
  var maxNumber = 100;
  var wins = 2;
  var number = getRandomNumber(minNumber, maxNumber);

  /**
   *
   * @function getRandomNumber generates a random number and returns that number
   * @param {Number} min is type number used to set minimum value
   * @param {Number} max is type number used to set maximum value
   * @returns a new random number between the min and max value inclusive
   */
  function getRandomNumber(min, max) {
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
   * @function setText
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
    if (wins > 2 && wins < 4) {
      setText(announcement, 'Please Choose a New min and Max.');
    } else {
      setText(announcement, 'Guess a number between  ' + minNumber + ' and ' + maxNumber);
    }
    clearInput(userGuessInput);
    clearText(userGuess);
    clearText(rangeGuess);
    number = getRandomNumber(minNumber, maxNumber);
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
      wins++;
      minNumber -= 10;
      maxNumber += 10;
      clearInput(userGuessInput);
      clearInput(minInput);
      clearInput(maxInput);
      clearText(announcement);
      clearText(rangeGuess);
      setText(userGuess, 'BOOM!');
      setText(winCounter, wins);
      countDown(3);
      if (wins > 2 && wins < 4) {
        minMaxForm.style.display = 'block';
        guessForm.style.display = 'none';
      }
    } else {
      setText(userGuess, 'Your last guess was');
      setText(userGuess, guess);
      clearInput(minInput);
      clearInput(maxInput);
      userGuess.style.visibility = 'visible';
      // nested ternary to check if number is in range gives error if out of range other wise shows hints about guess
      rangeGuess.innerText = guess < minNumber || guess > maxNumber || isNaN(guess) ? 'That guess of ' + guess + ' is invalid please enter a number from ' + minNumber + ' to ' + maxNumber : guess < number ? 'That is to low' : 'That is to high';
      clearInput(userGuessInput);
    }
  }

  /**
     * @function setLevelUp
     * @description creates new max and min range for next level of the game
     */
  function setLevelUp() {
    minNumber = parseInt(minInput.value);
    maxNumber = parseInt(maxInput.value);
    number = getRandomNumber(minNumber, maxNumber);
    console.log(number);
    minMaxForm.style.display = 'none';
    guessForm.style.display = 'block';
    setText(announcement, 'Your new Range is between ' + minNumber + ' and ' + maxNumber);
    userGuessInput.setAttribute('min', minNumber);
    userGuessInput.setAttribute('max', maxNumber);
    clearInput(minInput);
    clearInput(maxInput);
  }

  // guessButton eventListeners to enable buttons and check for win
  guessButton.addEventListener('change', enableButtons);
  guessButton.addEventListener('change', checkWin);

  //clearButton eventListeners to disable buttons and check for win
  clearButton.addEventListener('click', disableButtons);
  clearButton.addEventListener('click', function () {
    // on click clear input field and disable all appropriate buttons
    clearInput(userGuessInput);
  });

  // user change event for number
  userGuessInput.addEventListener('change', enableButtons);
  userGuessInput.addEventListener('keypress', function (e) {
    // prevent 'e' from being entered in number input
    if (e.which === 101) {
      e.preventDefault();
    }
    enableButtons();
  });

  // guessForm event listeners for disabling buttons and handling form submission
  guessForm.addEventListener('keydown', disableButtons);
  guessForm.addEventListener('submit', function (e) {
    // on submit prevent default form behavior and check for a win
    e.preventDefault();
    checkWin();
  });

  // resetButton Listeners to reset game and disable buttons
  resetButton.addEventListener('click', resetGame);
  resetButton.addEventListener('click', disableButtons);

  // minInput maxInput Listeners to enable buttons on keydown
  minInput.addEventListener('keydown', enableButtons);
  maxInput.addEventListener('keydown', enableButtons);

  // minMaxForm submit Listener to handel form submission
  minMaxForm.addEventListener('submit', function (e) {
    // on click prevent default form behavior and set new level
    e.preventDefault();
    setLevelUp();
  });
})();