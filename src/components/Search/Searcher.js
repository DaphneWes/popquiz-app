import React, { useState } from 'react'
import axios from 'axios';
import './Searcher.css';

function Searcher(props) {
    const [searchKey, setSearchKey] = useState("")
    const [playlist, setPlaylist] = useState([])
    const [searchState, setSearchState] = useState(false);
    const [readyForQuiz, setReadyForQuiz] = useState(false);
    const [namePlaylist, setNamePlaylist] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const access_token = props.token

    const searchArtist = async () => {
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params: {
                q: searchKey,
                type: "playlist",
                limit: 5
            }
        })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

        setPlaylist(data.playlists.items);
        console.log(data.playlists.items);
    }

    const setPlaylistID = (e) => {
        console.log(e.target);
        if (e.target.value < 40) {
            setErrorMessage('This playlist has not enough tracks! Choose another playlist.');
        }
        else {
            props.setQuizID("v1/playlists/" + e.target.id + "/tracks");
            setNamePlaylist(e.target.innerText);
            setSearchState(true);
        }
    }

    const getSearchQuizQuestions = () => {
        props.handleClickFetch();
        setReadyForQuiz(true);
    }

    const getSearchAudioQuizQuestions = () => {
        props.handleAudioClickFetch();
        setReadyForQuiz(true);
    }

    return (
        <>
            {!readyForQuiz ?
                <div>
                    {!searchState ?
                        <div>
                            <div className='title-frontpage'>
                                Popquiz
                            </div>
                            <div className="SearchForm">
                                <input
                                    className="Name"
                                    type="text"
                                    placeholder="Search for a playlist..."
                                    onChange={(e) => { setSearchKey(e.target.value) }}
                                />
                                <button onClick={searchArtist}>Search</button>
                            </div>
                            {errorMessage && (<p className="error"> {errorMessage} </p>)}
                            {
                                playlist.map(track => (
                                    <div key={track.id} >
                                        <ul className='playlist-list'>
                                            <li value={track.tracks.total} id={track.id} onClick={setPlaylistID}> {track.name}</li>
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div>
                            { }
                            <div className='ChosenPlaylist'>
                                You chose the playlist: {namePlaylist}
                            </div>

                            <button className="fetch-button" onClick={getSearchQuizQuestions}>Fetch Questions</button>
                            <button className="fetch-button" onClick={getSearchAudioQuizQuestions}>Fetch Audio Questions</button>
                        </div>
                    }
                </div>
                :
                <div>

                </div>
            }


        </>
    )
}

export default Searcher