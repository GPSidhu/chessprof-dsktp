import React from 'react'

// src
import GameController from '../components/GameController'
import { Player } from '../components/types'

const timeFormat = {
    duration: 10, // seconds - 3 min
    increment: 0 // seconds
}

const playerW: Player<"w"> = {id: "1", name: "Mr. White", color: "w", type: "human"};
const playerB: Player<"b"> = {id: "2", name: "Mr. Black", color: "b", type: "human"};

const PlayOffline = () => {
    return (
        <div>
            <GameController
                mode="offline"
                timeFormat={timeFormat}
                playerW={playerW}
                playerB={playerB}
                autoFlip
            />
        </div>
    )
}

export default PlayOffline
