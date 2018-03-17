(() => {
  const inputForm = document.getElementById('form-input');
  const guessButton = document.getElementById('guess-button');
  const guessForm = document.getElementById('guess-form');
  const clearButton = document.getElementById('clear-button');
  const resetButton = document.getElementById('reset-button');
  const numberGuess = document.getElementById('number-guess');
  const rangeGuess = document.getElementById('range-guess');
  const announcement = document.getElementById('announcement');
  let number = Math.floor(Math.random() * 100) + 1;

  /**
   * @function disableEnableButtons
   * @description toggle form inputs based on form state
   */
  const disableEnableButtons = () => {
    if (!inputForm.value.length) {
      guessButton.setAttribute('disabled', true);
      clearButton.setAttribute('disabled', true);
    }
    if (inputForm.value >= 1 && inputForm.value <= 100) {
      guessButton.removeAttribute('disabled');
      resetButton.removeAttribute('disabled');
      clearButton.removeAttribute('disabled');
    }
  };

  /**
   * @function resetGame
   * @description resets game back to initial state
   */
  const resetGame = () => {
    inputForm.value = '';
    announcement.innerText = 'Guess a number between 1 and 100';
    numberGuess.innerText = '';
    rangeGuess.innerText = '';
    number = Math.floor(Math.random() * 100) + 1;
    guessButton.setAttribute('disabled', true);
    resetButton.setAttribute('disabled', true);
  };

  /**
   * @function countDown
   * @description sets an one seconds interval for countdown to display in UI
   * @param {Number} i initiate setInterval and display countdown in UI
   */
  const countDown = i => {
    /**
     * @function int
     * @description used to clear Interval so that integer can be set and cleared on every win
     */
    const int = setInterval(() => {
      announcement.innerText = 'New Game begins in:';
      numberGuess.innerText = i;
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
  const checkWin = () => {
    const guess = inputForm.value;
    if (number === parseInt(guess)) {
      inputForm.value = '';
      announcement.innerText = '';
      numberGuess.innerText = 'BOOM!';
      rangeGuess.innerText = '';
      countDown(3);
    } else {
      announcement.innerText = 'Your last guess was';
      numberGuess.innerText = guess;
      numberGuess.style.visibility = 'visible';
      rangeGuess.innerText = guess < number ? 'That is to low!' : 'That is to high!';
      inputForm.value = '';
    }
  };

  guessButton.addEventListener('click', () => {
    checkWin();
    disableEnableButtons();
    // guessButton.setAttribute('disabled', true);
  });

  inputForm.addEventListener('keyup', () => disableEnableButtons());

  clearButton.addEventListener('click', () => {
    inputForm.value = '';
    disableEnableButtons();
    // guessButton.setAttribute('disabled', true);
  });

  guessForm.addEventListener('keypress', event => {
    if (event.keyCode === 13 && (inputForm.value >= 1 && inputForm.value <= 100)) {
      event.preventDefault();
      disableEnableButtons();
      checkWin();
    }
  });

  resetButton.addEventListener('click', () => {
    disableEnableButtons();
    resetGame();
  });
})();
