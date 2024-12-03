document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.button');

  let currentInput = '0';
  let lastOperator = null;

  const updateDisplay = (value) => {
      display.textContent = value;
  };

  const handleClear = () => {
      currentInput = '0';
      lastOperator = null;
      updateDisplay(currentInput);
  };

  const handleDelete = () => {
      currentInput = currentInput.slice(0, -1) || '0';
      updateDisplay(currentInput);
  };

  const handleInput = (value) => {
      if (currentInput === '0' && value !== '.') {
          currentInput = value;
      } else {
          currentInput += value;
      }
      updateDisplay(currentInput);
  };

  const handleOperator = (operator) => {
      if (!/[+\-*/%]$/.test(currentInput)) {
          currentInput += operator;
      }
      updateDisplay(currentInput);
  };

  const calculateResult = () => {
      try {
          const result = new Function('return ' + currentInput)();
          currentInput = result.toString();
          if (currentInput.length > 10) {
              currentInput = Number(result).toExponential(6);
          }
          updateDisplay(currentInput);
      } catch {
          updateDisplay('Error');
      }
  };

  buttons.forEach((button) => {
      button.addEventListener('click', () => {
          const value = button.textContent;

          if (button.id === 'clear') handleClear();
          else if (button.id === 'delete') handleDelete();
          else if (button.id === 'equals') calculateResult();
          else if (button.classList.contains('operator')) handleOperator(value);
          else handleInput(value);
      });
  });
});
