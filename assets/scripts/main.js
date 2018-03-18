(() => {
  const formInput = document.getElementById('form-input');
  const guessButton = document.getElementById('guess-button');
  const guessForm = document.getElementById('guess-form');
  const clearButton = document.getElementById('clear-button');
  const resetButton = document.getElementById('reset-button');
  const numberGuess = document.getElementById('number-guess');
  const rangeGuess = document.getElementById('range-guess');
  const announcement = document.getElementById('announcement');
  let number = Math.floor(Math.random() * 100) + 1;

  /**
   * @function enableButtons
   * @description enables form buttons and reset button
   */
  const enableButtons = () => {
    guessButton.removeAttribute('disabled');
    resetButton.removeAttribute('disabled');
    clearButton.removeAttribute('disabled');
    guessButton.removeAttribute('aria-disabled');
    resetButton.removeAttribute('aria-disabled');
    clearButton.removeAttribute('aria-disabled');
  };

  /**
   * @function disableButtons
   * @description disables guess button and clear button
   */
  const disableButtons = () => {
    guessButton.setAttribute('disabled', true);
    clearButton.setAttribute('disabled', true);
    resetButton.setAttribute('disabled', true);
    guessButton.setAttribute('aria-disabled', true);
    clearButton.setAttribute('aria-disabled', true);
    resetButton.setAttribute('aria-disabled', true);
  };

  /**
   * @function resetGame
   * @description resets game back to initial state
   */
  const resetGame = () => {
    formInput.value = '';
    announcement.innerText = 'Guess a number between 1 and 100';
    numberGuess.innerText = '';
    rangeGuess.innerText = '';
    number = Math.floor(Math.random() * 100) + 1;
    disableButtons();
    resetButton.setAttribute('disabled', true);
  };

  /**
   * @function countDown
   * @description sets an one second interval for countdown to display in UI
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
    const guess = parseInt(formInput.value);
    if (number === guess) {
      formInput.value = '';
      announcement.innerText = '';
      numberGuess.innerText = 'BOOM!';
      rangeGuess.innerText = '';
      countDown(3);
    } else {
      announcement.innerText = 'Your last guess was';
      numberGuess.innerText = guess;
      numberGuess.style.visibility = 'visible';
      // ternary to check if number is in range gives error if out of range other wise shows hints about guess
      rangeGuess.innerText =
        guess < 0 || guess > 100
          ? 'That Number is out of range please enter a valid number'
          : guess < number ? 'That is to low!' : 'That is to high!';
      formInput.value = '';
    }
  };

  guessButton.addEventListener('click', () => {
    // on click check for a win and disable appropriate buttons
    checkWin();
    disableButtons();
  });

  clearButton.addEventListener('click', () => {
    // on click clear input field and disable all appropriate buttons
    formInput.value = '';
    disableButtons();
  });

  formInput.addEventListener('change', () => {
    // on change event enable all buttons
    enableButtons();
  });

  formInput.addEventListener('keypress', e => {
    // prevent e from being entered in number input
    if (e.which === 101) {
      e.preventDefault();
    }
    enableButtons();
  });

  guessForm.addEventListener('keypress', e => {
    // if user presses enter key check for win disable buttons and prevent default form behavior
    if (e.which === 13) {
      e.preventDefault();
      disableButtons();
      checkWin();
    }
  });

  resetButton.addEventListener('click', () => {
    // rests the game and disables all buttons
    disableButtons();
    resetGame();
  });
})();
