import axios from 'axios';

export const fetchAudioQuestions = async (quizID) => {
    let access_token = window.localStorage.getItem("token");
    console.log(quizID);
    const { data } = await axios.get(`https://api.spotify.com/${quizID}`, {
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${access_token}`
        },
    })
        .catch(error => {
            return error;
        });
    console.log(data);

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    const shuffledData = shuffle(data.items);
    console.log(shuffledData);

    const count = 10;
    const questions = [];
    let counter = 0;

    for (let i = 0; i < (count * 4); i = i + 4) {
        const question = 
        {
            id: counter,
            songID: `https://open.spotify.com/embed/track/${shuffledData[i].track.id}?utm_source=generator&theme=0&autoplay=1`,
            text: "What song is this?",
            options: [
                { id: 0, text: shuffledData[i].track.name + " by " + shuffledData[i].track.artists[0].name, isCorrect: true },
                { id: 1, text: shuffledData[i + 1].track.name + " by " + shuffledData[i + 1].track.artists[0].name, isCorrect: false },
                { id: 2, text: shuffledData[i + 2].track.name + " by " + shuffledData[i + 2].track.artists[0].name, isCorrect: false },
                { id: 3, text: shuffledData[i + 3].track.name + " by " + shuffledData[i + 3].track.artists[0].name, isCorrect: false }
            ]
        }
        questions.push(question);
        counter++;
    }
    console.log(questions);
    return (questions)
}

