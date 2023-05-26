import axios from 'axios';

export const fetchQuizQuestions = async (quizID) => {
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

    const questions = [
        {
            text: "What is the number 1 song in the Netherlands right now?",
            options: [
                { id: 0, text: data.items[0].track.name, isCorrect: true },
                { id: 1, text: data.items[1].track.name, isCorrect: false },
                { id: 2, text: data.items[2].track.name, isCorrect: false },
                { id: 3, text: data.items[3].track.name, isCorrect: false }
            ]
        },
        {
            text: "What is the highest ranked artist from these four right now?",
            options: [
                { id: 0, text: data.items[0].track.artists[0].name, isCorrect: true },
                { id: 1, text: data.items[1].track.artists[0].name, isCorrect: false },
                { id: 2, text: data.items[2].track.artists[0].name, isCorrect: false },
                { id: 3, text: data.items[3].track.artists[0].name, isCorrect: false }
            ]
        },
        {
            text: "Which album cover?",
            options: [
                { id: 0, img: data.items[0].track.album.images[0].url, isCorrect: true },
                { id: 1, img: data.items[1].track.album.images[0].url, isCorrect: false },
                { id: 2, img: data.items[2].track.album.images[0].url, isCorrect: false },
                { id: 3, img: data.items[3].track.album.images[0].url, isCorrect: false }
            ]
        }
    ]

    return (questions)
}

