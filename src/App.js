import { useState } from 'react';
import './App.css';
import { Controlled as CodeMirror } from 'react-codemirror2'
import Button from 'react-bootstrap/Button';
import { useAlert } from 'react-alert'

import { ReactComponent as Logo } from './image.svg';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [code, setCode] = useState('');
  const alert = useAlert()

  const options = {
    mode: 'javascript',
    theme: 'material',
    lineNumbers: true,
    height: "75%"
  }

  const formatCode = () => {
    var parsed;

    try {
      parsed = JSON.parse(code)
    } catch (e) {
      alert.show(e.toString())
      return;
    }

    const stringified = JSON.stringify(parsed, null, 2) 

    setCode(stringified)
  }

  return (
    <div className="App">
      <div className="logo-container">
        <Logo className="logo" />
      </div>
      <div className="text-container">
      <CodeMirror
                options={options}
                value={code}
                onBeforeChange={(editor, data, value) => {
                  setCode(value);
                }}
      />
      </div>
      <div className="button-container">
        <Button variant="success" onClick={formatCode}>Format</Button>
      </div>
    </div>
  );
}

export default App;
