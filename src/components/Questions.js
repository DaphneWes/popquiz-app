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

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
    const shuffledData = shuffle(data.items);
    console.log(shuffledData);

    const randomSongIndex = getRandomInt(data.items.length);
    console.log(randomSongIndex);

    const questions = [
        {
            text: `Which artist/group sing the song "${shuffledData[0].track.name}"?`,
            options: [
                { id: 0, text: shuffledData[0].track.artists[0].name, isCorrect: true },
                { id: 1, text: shuffledData[1].track.artists[0].name, isCorrect: false },
                { id: 2, text: shuffledData[2].track.artists[0].name, isCorrect: false },
                { id: 3, text: shuffledData[3].track.artists[0].name, isCorrect: false }
            ]
        },
        {
            text: `From which album is the song "${shuffledData[4].track.name}"`,
            options: [
                { id: 0, img: shuffledData[4].track.album.images[0].url, isCorrect: true },
                { id: 1, img: shuffledData[5].track.album.images[0].url, isCorrect: false },
                { id: 2, img: shuffledData[6].track.album.images[0].url, isCorrect: false },
                { id: 3, img: shuffledData[7].track.album.images[0].url, isCorrect: false }
            ]
        },
        {
            text: `Which of these songs is by "${shuffledData[8].track.artists[0].name}"?`,
            options: [
                { id: 0, text: shuffledData[8].track.name, isCorrect: true },
                { id: 1, text: shuffledData[9].track.name, isCorrect: false },
                { id: 2, text: shuffledData[10].track.name, isCorrect: false },
                { id: 3, text: shuffledData[11].track.name, isCorrect: false }
            ]
        },
        {
            text: `Which artist/group sings the song "${shuffledData[12].track.name}"?`,
            options: [
                { id: 0, text: shuffledData[12].track.artists[0].name, isCorrect: true },
                { id: 1, text: shuffledData[13].track.artists[0].name, isCorrect: false },
                { id: 2, text: shuffledData[14].track.artists[0].name, isCorrect: false },
                { id: 3, text: shuffledData[15].track.artists[0].name, isCorrect: false }
            ]
        },
        {
            text: `From which album is the song "${shuffledData[16].track.name}"`,
            options: [
                { id: 0, img: shuffledData[16].track.album.images[0].url, isCorrect: true },
                { id: 1, img: shuffledData[17].track.album.images[0].url, isCorrect: false },
                { id: 2, img: shuffledData[18].track.album.images[0].url, isCorrect: false },
                { id: 3, img: shuffledData[19].track.album.images[0].url, isCorrect: false }
            ]
        },
        {
            text: `Which artist/group sings the song "${shuffledData[20].track.name}"?`,
            options: [
                { id: 0, text: shuffledData[20].track.artists[0].name, isCorrect: true },
                { id: 1, text: shuffledData[21].track.artists[0].name, isCorrect: false },
                { id: 2, text: shuffledData[22].track.artists[0].name, isCorrect: false },
                { id: 3, text: shuffledData[23].track.artists[0].name, isCorrect: false }
            ]
        }
        ,
        {
            text: `Which of these songs is by "${shuffledData[24].track.artists[0].name}"?`,
            options: [
                { id: 0, text: shuffledData[24].track.name, isCorrect: true },
                { id: 1, text: shuffledData[25].track.name, isCorrect: false },
                { id: 2, text: shuffledData[26].track.name, isCorrect: false },
                { id: 3, text: shuffledData[27].track.name, isCorrect: false }
            ]
        },
        {
            text: `From which album is the song "${shuffledData[28].track.name}"`,
            options: [
                { id: 0, img: shuffledData[28].track.album.images[0].url, isCorrect: true },
                { id: 1, img: shuffledData[29].track.album.images[0].url, isCorrect: false },
                { id: 2, img: shuffledData[30].track.album.images[0].url, isCorrect: false },
                { id: 3, img: shuffledData[31].track.album.images[0].url, isCorrect: false }
            ]
        },
        {
            text: `Which artist/group sings the song "${shuffledData[32].track.name}"?`,
            options: [
                { id: 0, text: shuffledData[32].track.artists[0].name, isCorrect: true },
                { id: 1, text: shuffledData[33].track.artists[0].name, isCorrect: false },
                { id: 2, text: shuffledData[34].track.artists[0].name, isCorrect: false },
                { id: 3, text: shuffledData[35].track.artists[0].name, isCorrect: false }
            ]
        }
        ,
        {
            text: `Which of these songs is by "${shuffledData[36].track.artists[0].name}"?`,
            options: [
                { id: 0, text: shuffledData[36].track.name, isCorrect: true },
                { id: 1, text: shuffledData[37].track.name, isCorrect: false },
                { id: 2, text: shuffledData[38].track.name, isCorrect: false },
                { id: 3, text: shuffledData[39].track.name, isCorrect: false }
            ]
        }
    ]

    return (questions)
}

