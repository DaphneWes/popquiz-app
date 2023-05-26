import axios from 'axios';

export const fetchQuizQuestions = async () => {
    let access_token = window.localStorage.getItem("token");
    const { data } = await axios.get("https://api.spotify.com/v1/playlists/37i9dQZEVXbKCF6dqVpDkS/tracks", {
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${access_token}`
        },
    })  
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
        }
    ]
    
    return (questions)
}

