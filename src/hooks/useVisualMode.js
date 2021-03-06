import { useState } from 'react';

// These functions change the "mode" that a appointment card is currently on, along with its history

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const replacer = (arr, newItem) => {
    let newArr = [];

    for(let item of arr) {
      if (arr.indexOf(item) !== (arr.length - 1)) {
        newArr.push(item);
      }
    }

    newArr.push(newItem);
    return newArr;
  }

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory(prev => (replacer(prev, newMode)));
      setMode(newMode);
    } else {
      setHistory(prev => ([...prev, newMode]));
      setMode(newMode);
    }

  }

  const back = () => {
    if (history.length > 1) {
      setMode(history[(history.indexOf(mode) - 1)]);
    } else {
      setMode(history[0]);
    }
  };
  
  return { mode, transition, back };
}

export default useVisualMode;