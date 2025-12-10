import { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [display, setDisplay] = useState('0');
  const [current, setCurrent] = useState('0');
  const [secondNum, setSecondNum] = useState('0');
  const [operation, setOperation] = useState('');
  const [result, setResult] = useState(false);
  const [memory, setMemory] = useState(0); 
  const [mode, setMode] = useState('basic');
  const [theme, setTheme] = useState('dark');  // NEW: Theme state
  const [history, setHistory] = useState([]);  // NEW: History state
  const [showHistory, setShowHistory] = useState(false);  // NEW: History toggle

  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
      inputDigit(e.key);
    } else if (e.key === '+' || e.key === '-') {
      inputOperation(e.key);
    } else if (e.key === '*') {
      inputOperation('×');
    } else if (e.key === '/') {
      inputOperation('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
      e.preventDefault();
      calculate();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
      clear();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [display, current, operation, result]);

   // SCIENTIFIC FUNCTIONS
  const sqrt = () => {
    const value = parseFloat(display);
    setDisplay(value >= 0 ? Math.sqrt(value).toString() : 'Error');
    setResult(true);
  };

  const square = () => {
    const value = parseFloat(display);
    setDisplay((value ** 2).toString());
    setResult(true);
  };

  const percent = () => {
    const value = parseFloat(display);
    setDisplay((value / 100).toString());
  };

  const oneOverX = () => {
    const value = parseFloat(display);
    setDisplay(value !== 0 ? (1 / value).toString() : 'Error');
    setResult(true);
  };

  const power = () => {
    setOperation('^');
    setCurrent(display);
    setDisplay(`${display} ^`);
    setSecondNum('0');
  };

  // Toggle mode
  const toggleMode = () => {
    setMode(mode === 'basic' ? 'scientific' : 'basic');
    clear();
  };
  

  const inputDigit = (digit) => {
    if (result) {
      setDisplay(digit);
      setCurrent(digit);
      setSecondNum(digit);
      setResult(false);
    } else if (display === '0' && digit !== '.') {
      setDisplay(digit);
      setCurrent(digit);
      setSecondNum(digit);
    }else if (operation && secondNum === '0') {
    setDisplay(digit);
     setSecondNum(digit);
    }else {
      setDisplay(display + digit);
      setSecondNum(secondNum+digit);
      // setCurrent(current + digit);
    }
  };

  const inputOperation = (op) => {
    if (result) {
      setCurrent(result.toString());
      setDisplay(result.toString());
      setSecondNum('0');
      setResult(false);
    }
    setOperation(op);
    setCurrent(display);
    setDisplay(`${display} ${op}`);
    setSecondNum('0');
  };

  const calculate = () => {
    const num1 = parseFloat(current);
    const num2 = parseFloat(secondNum);
    let calcResult;
    if (isNaN(num1) || isNaN(num2)) return;

    switch (operation) {
      case '+':
        calcResult = num1 + num2;
        break;
      case '-':
        calcResult = num1 - num2;
        break;
      case '×':
        calcResult = num1 * num2;
        break;
      case '÷':
        calcResult = num2 !== 0 ? num1 / num2 : 'Error';
        break;
      case '^': calcResult = Math.pow(num1, num2); break;
      default:
        return;
    }
        // NEW: Add to history
    setHistory(prev => [...prev.slice(-9), `${current} ${operation} ${secondNum} = ${calcResult}`]);


    setDisplay(calcResult.toString());
    setResult(calcResult);
    setOperation('');
    setSecondNum('0');
  };

  const clear = () => {
    setDisplay('0');
    setCurrent('0');
    setSecondNum('0');
    setOperation('');
    setResult(false);
  };

   // NEW: Clear history
  const clearHistory = () => setHistory([]);

   const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    // NEW: Memory functions
  const memoryClear = () => setMemory(0);
  const memoryRecall = () => setDisplay(memory.toString());
  const memoryAdd = () => setMemory(memory + parseFloat(display));
  const memorySubtract = () => setMemory(memory - parseFloat(display));

  // NEW: Backspace + Clear Entry
  const backspace = () => {
    const newDisplay = display.slice(0, -1);
    setDisplay(newDisplay || '0');
    if (operation) {
      setSecondNum(newDisplay || '0');
    }
  };

  const clearEntry = () => {
    setDisplay('0');
    if (operation) setSecondNum('0');
  };

  return (
    // <div className="calculator">
     <div className={`app ${theme} ${mode}`}>
      <div className={`calculator ${theme}`}>
        {/* THEME TOGGLE */}
        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      {/* NEW: Memory indicator
      {memory !== 0 && <div className="memory-indicator">M</div>}
      <div className="mode-toggle">
        <button onClick={toggleMode}>
          {mode === 'basic' ? 'SCIENTIFIC' : 'BASIC'}
        </button>
      </div>
      
      <div className="display">{display}</div> */}
      
        {/* HISTORY TOGGLE */}
        <div className="history-toggle">
          <button onClick={() => setShowHistory(!showHistory)}>
            📜 {history.length}
          </button>
        </div>

        {memory !== 0 && <div className={`memory-indicator ${theme}`}>M</div>}
        
        <div className={`mode-toggle ${theme}`}>
          <button onClick={() => {setMode(mode === 'basic' ? 'scientific' : 'basic'); clear();}}>
            {mode === 'basic' ? 'SCIENTIFIC' : 'BASIC'}
          </button>
        </div>
        
        <div className={`display ${theme}`}>{display}</div>

      {/* HISTORY PANEL */}
        {showHistory && (
          <div className={`history-panel ${theme}`}>
            <div className="history-header">
              <span>History</span>
              <button onClick={clearHistory}>Clear</button>
            </div>
            <div className="history-list">
              {history.map((item, i) => (
                <div key={i} className="history-item" onClick={() => setDisplay(item.split('=')[1])}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      
      <div className="buttons">
        {/* First row */}
        <button onClick={clear}>AC</button>
        <button onClick={clearEntry}>CE</button>
        <button onClick={backspace}>⌫</button>
        <button onClick={memoryClear}>MC</button>
        
        {/* Scientific row (only show in scientific mode) */}
        {mode === 'scientific' && (
          <>
            <button className="sci" onClick={sqrt}>√</button>
            <button className="sci" onClick={square}>x²</button>
            <button className="sci" onClick={percent}>%</button>
            <button className="sci" onClick={oneOverX}>1/x</button>
          </>
        )}
        
        {/* Memory row */}
        <button onClick={memoryRecall}>MR</button>
        <button onClick={memoryAdd}>M+</button>
        <button onClick={memorySubtract}>M-</button>
        <button onClick={() => inputOperation('÷')}>÷</button>
        
        {/* Number rows */}
        <button className="digit" onClick={() => inputDigit('7')}>7</button>
        <button className="digit" onClick={() => inputDigit('8')}>8</button>
        <button className="digit" onClick={() => inputDigit('9')}>9</button>
        <button onClick={() => inputOperation('×')}>×</button>
        
        <button className="digit" onClick={() => inputDigit('4')}>4</button>
        <button className="digit" onClick={() => inputDigit('5')}>5</button>
        <button className="digit" onClick={() => inputDigit('6')}>6</button>
        <button onClick={() => inputOperation('-')}>-</button>
        
        <button className="digit" onClick={() => inputDigit('1')}>1</button>
        <button className="digit" onClick={() => inputDigit('2')}>2</button>
        <button className="digit" onClick={() => inputDigit('3')}>3</button>
        <button onClick={() => inputOperation('+')}>+</button>
        
        <button className="digit zero" onClick={() => inputDigit('0')}>0</button>
        <button className="digit" onClick={() => inputDigit('.')}>.</button>
        {mode === 'basic' ? (
          <button className="equals" onClick={calculate}>=</button>
        ) : (
          <button onClick={power}>^</button>
        )}
      </div>
    </div>
  </div>
  );
}

export default App;

