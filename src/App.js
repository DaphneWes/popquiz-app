
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
  const [quizID, setQuizID] = useState("v1/playlists/37i9dQZEVXbKCF6dqVpDkS/tracks");

  const handleClickFetch = async () => {
    const fetchedQuestions = await fetchQuizQuestions(quizID);
    setQuestions(fetchedQuestions);
    setLoadQuestions(true);
  }

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className="logOut" onClick={logout}>Logout</button>
        <div className="SearchContainer">
          {!token ?
            <div >
              <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
            </div>
            :
            <div>
              {!loadQuestions ?
                <div className='chooseQuiz'>
                  <div className='title-frontpage'>
                    Popquiz
                  </div>
                  <div className='info-frontpage'>
                    Choose the genre of the quiz:
                  </div>
                  <form>
                    <select onChange={(e) => {
                      setQuizID(e.target.value);
                    }}>
                      <option value="v1/playlists/37i9dQZEVXbKCF6dqVpDkS/tracks">Current NL top 50</option>
                      <option value="v1/playlists/1Hno5OKWwHag0fuRBrXzWL/tracks">90s Hits</option>
                      <option value="v1/playlists/37i9dQZF1DXb57FjYWz00c/tracks">80s Hits</option>
                      <option value="v1/playlists/3NgkCmLvO7UrtMsVBEeFVU/tracks">70s Hits</option>
                    </select>
                  </form>
                  <button className="fetch-button" onClick={handleClickFetch}>Fetch Questions</button>
                </div>
                :
                <div className='QuizReady'>
                  <div className='top-bar'>
                    <div className='title-popquiz'>Popquiz</div>
                    <button className="homeButton" onClick={refreshPage}>Home</button>
                  </div>
                  <Quiz token={token} questions={questions} />
                </div>
              }
            </div>
          }
        </div>
      </header>
    </div>
  );
}

export default App;