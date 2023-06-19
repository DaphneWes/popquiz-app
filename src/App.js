import './App.css';
import React, { useState, useEffect } from 'react';
import Searcher from './components/Search/Searcher';
import Quiz from './components/Quiz/Quiz';
import { fetchQuizQuestions } from './components/Questions';
import { fetchAudioQuestions } from './components/QuestionWithAudio';
// import AudioQuestions from './components/AudioQuestions';

function App() {

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
  const REDIRECT_URI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI
  const AUTH_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT
  const RESPONSE_TYPE = process.env.REACT_APP_SPOTIFY_RESPONSE_TYPE
  const scopes = [
    "streaming",
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
    "app-remote-control"
  ];
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

  const searchPage = () => {
    setStartSearch(true);
  }

  // check button clicked
  const [questions, setQuestions] = useState({});
  const [audio, setAudio] = useState();
  const [loadQuestions, setLoadQuestions] = useState(false);
  const [quizID, setQuizID] = useState("v1/playlists/37i9dQZEVXbKCF6dqVpDkS/tracks");
  const [startSearch, setStartSearch] = useState(false);

  const handleClickFetch = async () => {
    const fetchedQuestions = await fetchQuizQuestions(quizID);
    setQuestions(fetchedQuestions);
    setLoadQuestions(true);
    setAudio(false);
    setStartSearch(false);
  }

  const handleAudioClickFetch = async () => {
    const fetchedQuestions = await fetchAudioQuestions(quizID);
    setQuestions(fetchedQuestions);
    setLoadQuestions(true);
    setAudio(true);
    setStartSearch(false);
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
              {/* Load login page */}
              <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join("%20")}&response_type=${RESPONSE_TYPE}&show_dialog=true`}>Login to Spotify</a>
            </div>
            :
            <div>
              {!startSearch ?
                <div>
                  {/* Load the frontpage with form */}
                  {!loadQuestions ?
                    <div className='chooseQuiz'>
                      <button className='searchButton' id="front-page" onClick={searchPage}>Search</button>
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
                          <option value="v1/playlists/37i9dQZF1DWUH2AzNQzWua/tracks">Oldies but Goodies</option>
                          <option value="v1/playlists/37i9dQZF1DX3h0GYVBJE64/tracks">10s-20s Summer Hits</option>
                          <option value="v1/playlists/1Hno5OKWwHag0fuRBrXzWL/tracks">90s Hits</option>
                          <option value="v1/playlists/37i9dQZF1DXb57FjYWz00c/tracks">80s Hits</option>
                          <option value="v1/playlists/3NgkCmLvO7UrtMsVBEeFVU/tracks">70s Hits</option>
                        </select>
                      </form>
                      <button className="fetch-button" onClick={handleClickFetch}>Fetch Questions</button>
                      <button className="fetch-button" onClick={handleAudioClickFetch}>Fetch Audio Questions</button>
                      {/* <AudioQuestions token={token}/> */}
                    </div>
                    :
                    <div className='QuizReady'>
                      <div className='top-bar'>
                        <div className='title-popquiz'>Popquiz</div>
                        <button className="homeButton" onClick={refreshPage}>Home</button>
                        <button className='searchButton' onClick={searchPage}>Search</button>
                      </div>
                      <Quiz token={token} questions={questions} withAudio={audio} />
                    </div>
                  }
                </div> :
                // Show the search page
                <div className='Search-page'>
                  <button className="homeButton" onClick={refreshPage}>Home</button>
                  <Searcher token={token} handleClickFetch={handleClickFetch} handleAudioClickFetch={handleAudioClickFetch} setQuizID={setQuizID} />
                </div>
              }
            </div>
          }
        </div>
      </header>
      <script src="https://sdk.scdn.co/spotify-player.js"></script>
    </div>
  );
}

export default App;