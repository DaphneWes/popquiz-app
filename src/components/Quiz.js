import React, { useState } from 'react'
import './Quiz.css'

function Quiz(props) {

    const questions = props.questions

    // start quiz

    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);


    // Helper Functions

    /* A possible answer was clicked */
    const optionClicked = (isCorrect) => {
        // Increment the score
        if (isCorrect) {
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

        <div className="App">

            {/* 2. Current Score  */}
            <h2>Score: {score}</h2>

            {/* 3. Show results or show the question game  */}
            {showResults ? (
                /* 4. Final Results */
                <div className="final-results">
                    <h1>Final Results</h1>
                    <h2>
                        {score} out of {questions.length} correct - (
                        {(score / questions.length) * 100}%)
                    </h2>
                    <button onClick={() => restartGame()}>Restart game</button>
                </div>
            ) : (
                /* 5. Question Card  */
                <div className="question-card">
                    {/* Current Question  */}
                    <h3>
                        Question: {currentQuestion + 1} out of {questions.length}
                    </h3>
                    <h3 className="question-text">{questions[currentQuestion].text}</h3>

                    {/* List of possible answers  */}
                    <ul>
                        {questions[currentQuestion].options.map((option) => {
                            return (
                                <li
                                    key={option.id}
                                    onClick={() => optionClicked(option.isCorrect)}
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