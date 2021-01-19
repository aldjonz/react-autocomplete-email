# react-autocomplete-email
A configurable &amp; lightweight React wrapper component that enables "out of the box" email autocomplete/suggestions on input elements.

![Autocomplete in Action](https://github.com/jameswylie/vue-email-autocomplete/blob/main/docs/images/vue-email-autocomplete.gif?raw=true)

✅ A wrapper component so you can use alongside other form enabled libraries (such as Buefy).\
✅ Customizable.\
✅ Allow users to easily navigate the suggestions list by simply using the "up/down" keys.\
✅ Users can also auto-fill the input with the desired value by hitting the "enter" key upon selection.

## Installation

```bash

# yarn
yarn add react-autocomplete-email

# npm
npm install react-autocomplete-email --save

```

## Basic Usage

```jsx

/* Import useState and useRef from React and import package */

import React, { useState, useRef } from 'react';
import EmailAutoComplete from './components/EmailAutoComplete';

function App() {

  /* Set state and ref */

  const [inputVal, setInputVal] = useState('')
  const emailAutoCompleteRef = useRef();

  return (
      
    <EmailAutoComplete ref={emailAutoCompleteRef} onCompletion={val => setInputVal(val)}>
      <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => emailAutoCompleteRef.current.check(e)} />
    </EmailAutoComplete>
    
  );

}

export default App;

```

## Configuration Example (Custom Domain Lists)

```jsx

/* A "domains" prop is added to the component and references the array of domains within the data property below */

/* Import useState and useRef from React and import package */

import React, { useState, useRef } from 'react';
import EmailAutoComplete from './components/EmailAutoComplete';

function App() {

  /* Set state and ref */
  
  const [inputVal, setInputVal] = useState('')
  const emailAutoCompleteRef = useRef();

  /* Domain List */

  const customDomains = [
    
    "domain1.com",
    "domain2.com",
    "domain3.com",
    "domain4.com",

  ]

  return (

    <EmailAutoComplete ref={emailAutoCompleteRef} onCompletion={val => setInputVal(val)} domains={customDomains}>
      <input type="text" name="email" placeholder="Email..." value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => emailAutoCompleteRef.current.check(e)} />
    </EmailAutoComplete>
    
  );

}

export default App;

```

## Configuration Example (On Submit Callbacks)

```jsx

/* An "onSubmit" prop is added to the component and references a method below */

/* Import useState and useRef from React and import package */

import React, { useState, useRef } from 'react';
import EmailAutoComplete from './components/EmailAutoComplete';

function App() {

  /* Set state and ref */

  const [inputVal, setInputVal] = useState('')
  const emailAutoCompleteRef = useRef();
  
  const validateForm = () => {
    
    /* Called when a user hits enter when focused on the wrapped input element */
    
  };

  return (
      
    <EmailAutoComplete ref={emailAutoCompleteRef} onCompletion={val => setInputVal(val)} onSubmit={() => validateForm()}>
      <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => emailAutoCompleteRef.current.check(e)} />
    </EmailAutoComplete>
    
  );

}

export default App;

```

## Configuration Example (Custom Inline Styles)

```jsx

/* A "css" prop is added to the component and references a computed property below */


/* Import useState and useRef from React and import package */

import React, { useState, useRef } from 'react';
import EmailAutoComplete from './components/EmailAutoComplete';

function App() {

  /* Set state and ref */

  const [inputVal, setInputVal] = useState('')
  const emailAutoCompleteRef = useRef();
  
  const styleOverrides = {
  
    /* Edit style for the suggestions "outer" container */

    container: {
      position: 'fixed',
      top: '40px',
      left: '40px'
    },

    /* Edit style for the suggestions overlay */

    overlay: {
      backgroundColor: #FFF
    },

    /* Edit style for the suggestions text */

    text: {

      /* Main text */

      suggestion: {
        color: purple
      },

      /* Highlighted/matched text */

      highlight: {
        color: blue
      }
  };

  return (
      
    <EmailAutoComplete ref={emailAutoCompleteRef} onCompletion={val => setInputVal(val)} css={styleOverrides}>
      <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} onKeyDown={(e) => emailAutoCompleteRef.current.check(e)} />
    </EmailAutoComplete>
    
  );

}

export default App;

```

## Configuration Example (CSS stylesheet overriddes)

```bash

Coming Soon!

```

# Props

<table>
    <thead>
    <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Optional</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>domains</td>
        <td>Array</td>
        <td>No</td>
        <td>A selection of the most statistically popular email domain extensions.</td>
        <td>A customized list of email domain extensions.</td>
    </tr>
    <tr>
        <td>onCompletion</td>
        <td>Function</td>
        <td>Yes</td>
        <td>N/A</td>
        <td>A function that you'd like the component to invoke after the user has selected a suggested completion (e.g. update the value/model of the input element).</td>
    </tr>
    <tr>
        <td>onSubmit</td>
        <td>Function</td>
        <td>No</td>
        <td>N/A</td>
        <td>A function that you'd like the component to invoke once the user hits the "enter" key when the nested input is in focus (e.g. carry out validations or submit the form).</td>
    </tr>
    <tr>
        <td>css</td>
        <td>Object</td>
        <td>No</td>
        <td>N/A</td>
        <td>CSS style overrides for specific elements of the suggestions component (See above examples).</td>
    </tr>
    </tbody>
</table>

# :racing_car: Roadmap

- Add extra CSS override mappings.
- Add ability to override CSS with a stylesheet (enables usage with media queries).
- Autocomplete default suggestions list to be based on browser language detection, which will make the suggestions more regionally relevant.

# :beer: Buy me a <del>Beer</del> Cider

Donations are welcome and very much appreciated!

**ETH:** 0xb53dF77A7B18948f8f8FafF5DeF7bCc4E7Dbb30A\
**BTC (Native Segwit):** bc1qval55py30qt0jtrvuaa3zdfsft2weurnkn0kcj\
**BTC (Segwit):** 3BiTzQLcqwyCiMa8ydCu6dpdZzo8XgSzvU


# Contributions

If you'd like to contribute and add functionality to this project, feel free to fork this repo, create a new feature branch and then submit a pull request.
