import { useState, useCallback, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState(8);
  const [password, setpassword] = useState('');
  const [numbers, setnumber] = useState(false);
  const [characters, setCharacter] = useState(false);

  const clipref = useRef(null);

  const passgen = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    //  let  num="0123456789"

    if (numbers) str += '0123456789';
    if (characters) str += '!@#$%^&*-_+=[]{}~`';

    for (let index = 0; index < length; index++) {
      let random = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(random);

      setpassword(pass);
    }
  }, [length, setpassword, numbers, characters]);

  const copypassword = useCallback(() => {
    clipref.current?.select();
    clipref.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passgen();
  }, [length, setnumber, setCharacter, passgen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-slate-600 text-orange-500 bg-black">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={clipref}
          />
          <button
            onClick={copypassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbers}
              id="numberInput"
              onChange={() => {
                setnumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characters}
              id="characterInput"
              onChange={() => {
                setCharacter((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
