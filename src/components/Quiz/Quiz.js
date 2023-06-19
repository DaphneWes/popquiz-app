import React, { useState } from 'react'
import './Quiz.css'

function Quiz(props) {

    const questions = props.questions;
    const withAudio = props.withAudio;

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

    // start quiz

    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [allAnswers, setAllAnswers] = useState([]);


    // Helper Functions
    function refreshPage() {
        window.location.reload();
    }

    /* A possible answer was clicked */
    const optionClicked = (option) => {
        const copyAnswers = [...allAnswers];
        copyAnswers.push(option);
        setAllAnswers(copyAnswers);

        // Increment the score
        if (option.isCorrect) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    /* Resets the game back to default */
    const restartGame = () => {
        setScore(0);
        setCurrentQuestion(0);
        setShowResults(false);
    };

    return (

        <div className="Quiz-container">

            {/* 2. Current Score  */}
            <h2 className='score'>Score: {score}</h2>

            {/* 3. Show results or show the question game  */}
            {showResults ? (
                /* 4. Final Results */
                <div className='results-container'>
                    <div className="final-results">
                        <h1>Final Results</h1>
                        <h2>
                            {score} out of {questions.length} correct - (
                            {(score / questions.length) * 100}%)
                        </h2>
                        <button onClick={() => restartGame()}>Restart game</button>
                        <button onClick={() => refreshPage()}>Start new game</button>
                    </div>

                    {/* Returns the correct answers */}
                    <div className='all-answers'>
                        <h3>Scroll down for the correct answers</h3>
                        {questions.map((question) => {
                            return (
                                <div className='correct-results' key={question.id}>
                                    <li className='answer'>
                                        <div className='question-id'>Question {question.id + 1}:</div>
                                        <div className='question-final-answers'>{question.text}</div>
                                        {!question.options[0].text ?
                                            <div className='check-if-album-is-correct'>
                                                {question.options[0].img === allAnswers[question.id].img ?
                                                    <div className='album-is-correct'>
                                                        <div className='album-cover'>
                                                            <img src={question.options[0].img} alt="album-cover" width="200" height="200"></img>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='album-is-incorrect'>
                                                        <div className='album-cover-wrong'>
                                                            <img src={allAnswers[question.id].img} alt="album-cover" width="200" height="200"></img>
                                                        </div>
                                                        <div className='album-cover-good'>
                                                            <p>The correct album is : </p>
                                                            <img src={question.options[0].img} alt="album-cover" width="200" height="200"></img>
                                                        </div>
                                                    </div>
                                            }
                                            </div>
                                            :
                                            <div className='text-option-final-answers'>
                                                {question.options[0].text === allAnswers[question.id].text ?
                                                    <div className='answer-is-correct'>
                                                        {question.options[0].text}
                                                    </div>
                                                    :
                                                    <div className='answer-is-incorrect'>
                                                        {allAnswers[question.id].text}
                                                        <p>The correct answer was : {question.options[0].text}</p>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </li>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
                /* 5. Question Card  */
                <div className="question-card">
                    {/* Current Question  */}
                    <h3>
                        Question: {currentQuestion + 1} out of {questions.length}
                    </h3>
                    {!withAudio ?
                        <h3 className="question-text">{questions[currentQuestion].text}</h3>
                        :
                        <div>
                            <div className='audioPlayer'>
                                <h3 className="question-text">{questions[currentQuestion].text}</h3>
                                <div className="coverOverPlayer"></div>
                                <iframe id="songPlayer" title="songPlayer" src={questions[currentQuestion].songID} width="50%" height="100" allow="autoplay; encrypted-media;"></iframe>
                            </div>
                            <p className='warning-tooSmall'>The window is too small to show the audio player. Please make your window bigger.</p>
                        </div>
                    }

                    {/* List of possible answers - shuffled  */}
                    <ul>
                        {shuffle(questions[currentQuestion].options).map((option) => {
                            return (
                                <li
                                    key={option.id}
                                    onClick={() => optionClicked(option)}
                                >
                                    {!option.text ?
                                        <div className='album-cover'>
                                            <img src={option.img} alt="album-cover" width="200" height="200"></img>
                                        </div>
                                        :
                                        <div className='text-option'>
                                            {option.text}
                                        </div>
                                    }

                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}


export default Quiz