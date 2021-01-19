import React, { useState, useRef } from 'react';

import './App.css';
import EmailAutoComplete from './components/react-autocomplete-email.js';

function App() {
  const [inputVal, setInputVal] = useState('')
  const emailAutoCompleteRef = useRef();

  return (
    <div className="react-auto-complete-email">
      <form>
        <input type="text" name="name" placeholder="Name..." />
        <br />
        <EmailAutoComplete ref={emailAutoCompleteRef} onCompletion={val => setInputVal(val)} >
          <input type="text" name="email" placeholder="Email..." value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => emailAutoCompleteRef.current.check(e)} />
        </EmailAutoComplete>
        <input type="date" name="age" placeholder="Enter date..." />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );

}

export default App;