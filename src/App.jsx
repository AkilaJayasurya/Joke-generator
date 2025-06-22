import React, { useState } from 'react'
import './App.css'
import { fetchJoke } from './jokeSlice';
import { useSelector, useDispatch } from 'react-redux';



function App() {
   const [category, setCategory] = useState("");
  const {joke, error} = useSelector(function(state) {
    return state.joke;
  });

  const dispatch = useDispatch();

  const handleChangeCategory = (event) => {
    let temp = event.target.value.trim().toLowerCase();
    setCategory(temp);
  }

  const handleClick = () => {
    dispatch(fetchJoke(category))
  }

  return (
    <main className="container">
      <h1 className="header text-4xl font-bold">Random Joke Generator</h1>
      <input className="inputBox" onChange={handleChangeCategory} type="text" placeholder="Enter category..." />
      <button onClick={handleClick} className="getBtn">Get joke</button> 
      <h2 className='text-xl italic mt-5'>{error ? error : joke}</h2>
    </main>
  )
}

export default App


//categories
  "animal",
  "career",
  "celebrity",
  "dev",
  "explicit",
  "fashion",
  "food",
  "history",
  "money",
  "movie",
  "music",
  "political",
  "religion",
  "science",
  "sport",
  "travel"
