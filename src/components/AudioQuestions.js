import React, { useState } from 'react'
import axios from 'axios';

function AudioQuestions(props) {
    const access_token = props.token;
    const [dataDevice, setDataDevice] = useState();

    const searchPlayer = async () => {
        const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${access_token}`
            }
        })
        setDataDevice(data);
        console.log(data);
    }

    const playNow = async () => {
        await axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${dataDevice.device.id}`, {
            // body: {
            //     uris: ["spotify:track:1DmW5Ep6ywYwxc2HMT5BG6", "spotify:track:1odExI7RdWc4BT515LTAwj"]
            // },
            // body: {
            //     "context_uri": "spotify:playlist:37i9dQZEVXbKCF6dqVpDkS",
            //     "offset": {
            //         "position": 0
            //     },
            //     "position_ms": 0
            // },
            headers: {
                // Accept: 'application/json',
                'Content-Type': "application/json",
                'Authorization': `Bearer ${access_token}`
            }
        })
    }

    const stopNow = async () => {
        await axios.put(`https://api.spotify.com/v1/me/player/play`, {
            // body: {
            //     uris: ["spotify:track:1DmW5Ep6ywYwxc2HMT5BG6", "spotify:track:1odExI7RdWc4BT515LTAwj"]
            // },
            body: {
                "context_uri": "spotify:playlist:37i9dQZF1DXb57FjYWz00c",
                "offset": {
                    "position": 0
                },
                "position_ms": 0
            },
            headers: {
                Accept: 'application/json',
                'Content-Type': "application/json",
                'Authorization': `Bearer ${access_token}`
            }
        })
    }

    const playTrack = () => {
        const path = 'https://api.spotify.com/v1/me/player/play?device_id=' + dataDevice.device.id;
        axios({
            method: 'put',
            url: path,
            data: {
                "context_uri": "spotify:playlist:37i9dQZF1DXb57FjYWz00c"
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        })
    }

    return (
        <>
            <div className="PlayerData">
                <button onClick={searchPlayer}>Get player data</button>
                <button onClick={playNow}>Play</button>
                <button onClick={playTrack}>Play New</button>
                <button onClick={stopNow}>Stop</button>
                <iframe title="songTatoo"src="https://open.spotify.com/embed/track/1DmW5Ep6ywYwxc2HMT5BG6?utm_source=generator&theme=0" width="30%" height="100" allowfullscreen=""></iframe>
            </div>
        </>
    )
}

export default AudioQuestions