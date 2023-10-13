import { useState } from 'react'

import { useCallback,useEffect,useRef } from 'react';

function App() {
  const [length, setlength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [sumbolsAllowed, setsumbolsAllowed] = useState(false);
  const [password, setpassword] = useState('');
const passwordRef = useRef(null);
  const copyPass =()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password);
  }
  const passwordGeenerator = useCallback((()=>{
    let pass ='';
    let string ='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if(numAllowed) string +='0123456789';
    if(sumbolsAllowed) string +="(){}[],.<>/?:;'!@#$%^&+_-*";
    for(let i = 1;i<=length;i++){
      let char = Math.floor(Math.random()*string.length+1);
       pass += string.charAt(char);
    }
    setpassword(pass);
  }),[length,numAllowed,sumbolsAllowed,setpassword])
useEffect(()=>{
  passwordGeenerator();},[length,numAllowed,sumbolsAllowed,passwordGeenerator])
  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-4 text-orange-500 bg-gray-700 text-center'>
      <h1 className="text-4xl text-center text-white">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
        value={password}
        placeholder='password'
        className='outline-none w-full py-1 px-3'
        readOnly
        ref={passwordRef} />
        <button onClick={copyPass} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" >copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" 
          name="" 
          id=""
          min={8}
          max={100}
          value={length} 
          className="cursor-pointer"
          onChange={(e)=>{
            setlength(e.target.value);
          }}  />
          <label>Length{length}</label>
        </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
            id="numberInput"
             defaultChecked={numAllowed}
              onChange={()=>{setnumAllowed((prev)=>!prev)}} />
              <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" 
            name="number" 
            id="sumbleInput"
             defaultChecked={numAllowed}
              onChange={()=>{setsumbolsAllowed((prev)=>!prev)}} />
              <label htmlFor="sumbleInput">Symbols</label>
          </div>
      </div>
     </div>
    </>
  )
}

export default App
