import React, { useState } from 'react';

function Game({channel}) {
    const [playersJoined, setPlayersJoined] = useState(
        channel.state.watcher_count === 2
        );
    channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2)
    })
    if (!playersJoined) {
        return <div> Waiting for other player to join...</div>
    }
    return (
        <div className="gameContainer">
            Game
        </div>
    )
    
}

export default Game;