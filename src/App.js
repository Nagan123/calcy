import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');   // To store the current input
  const [result, setResult] = useState(''); // To store the calculation result
  const [isResult, setIsResult] = useState(false); // To track if result is displayed

  // Function to handle button clicks
  const handleClick = (value) => {
    // If "C" is clicked, clear everything
    if (value === 'C') {
      setInput('');
      setResult('');
      setIsResult(false);
    }
    // If "=" is clicked, calculate the result
    else if (value === '=') {
      try {
        const calculatedResult = eval(input); // Calculate the result
        setResult(calculatedResult);
        setInput(calculatedResult.toString()); // Set input to result to continue the operation
        setIsResult(true);  // Mark that the result has been displayed
      } catch (error) {
        setResult('Error');
      }
    }
    // If backspace is clicked, remove the last character
    else if (value === 'backspace') {
      if (!isResult) {
        setInput(input.slice(0, -1)); // Remove last character
      }
    }
    // If an operator is clicked right after result, start new calculation with result
    else if (['+', '-', '*', '/'].includes(value)) {
      if (isResult) {
        setInput(result + value); // Continue operation from the result
        setIsResult(false); // Reset result mode
      } else {
        setInput(input + value);
      }
    }
    // Otherwise, append the clicked button value to the input
    else {
      if (isResult) {
        setInput(value);  // Start fresh with new input if result is displayed
        setIsResult(false); // Reset result mode
      } else {
        setInput(input + value);
      }
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <p>{input || "0"}</p>  {/* Display input or 0 if empty */}
        <h2>{result}</h2>      {/* Display the result */}
      </div>
      <div className="buttons">
        {/* Number buttons */}
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('0')}>0</button>

        {/* Operator buttons */}
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('/')}>/</button>

        {/* Special buttons */}
        <button onClick={() => handleClick('C')}>C</button>  {/* Clear */}
        <button onClick={() => handleClick('backspace')}>⌫</button> {/* Backspace */}
        <button onClick={() => handleClick('=')}>=</button>  {/* Calculate */}
      </div>
    </div>
  );
}

export default App;
