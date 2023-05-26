
import './App.css';
import React, { useState, useEffect } from 'react';
// import Searcher from './components/Searcher';
import Quiz from './components/Quiz';
import { fetchQuizQuestions } from './components/Questions';

function App() {

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
  const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI
  const AUTH_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT
  const RESPONSE_TYPE = process.env.REACT_APP_SPOTIFY_RESPONSE_TYPE
  const [token, setToken] = useState("");

  useEffect(() => {

    const hash = window.location.hash;
    let token = window.localStorage.getItem("token")

    if (hash && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)

    }

    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token");
  }
  
  // check button clicked
  const [questions, setQuestions] = useState({});
  const [loadQuestions, setLoadQuestions] = useState(false);

  const handleClickFetch = async () => {
    const fetchedQuestions = await fetchQuizQuestions();
    setQuestions(fetchedQuestions);
    setLoadQuestions(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="SearchContainer">
          <h2>Popquiz</h2>
          {!token ?
            <div >
              <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
            </div>
            :
            <div>
              {!loadQuestions ?
              <div className='chooseQuiz'>
                <button onClick={handleClickFetch}>Fetch Questions</button>
              </div>
              :
              <Quiz token={token} questions={questions} />
              }
              <button className="logOut" onClick={logout}>Logout</button>
            </div>
          }
        </div>
      </header>
    </div>
  );
}

export default App;