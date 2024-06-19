document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const buttonContent = button.textContent;
  
        if (button.id === 'clear') {
          display.textContent = '0';
        } else if (button.id === 'delete') {
          display.textContent = display.textContent.slice(0, -1) || '0';
        } else if (button.id === 'equals') {
          try {
            const result = new Function('return ' + display.textContent)();
            // Check if result length is greater than 10 (excluding negative sign)
            if (result.toString().length > 10 && result.toString()[0] !== '-') {
              display.textContent = result.toExponential(6); // Use toExponential with 6 decimal places
            } else {
              display.textContent = result;
            }
          } catch {
            display.textContent = 'Error';
          }
        } else {
          if (display.textContent === '0' && buttonContent !== '.' && buttonContent !== '%') {
            display.textContent = buttonContent;
          } else {
            display.textContent += buttonContent;
          }
        }
      });
    });
  });
  