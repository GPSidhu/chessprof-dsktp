import React from 'react'

// src
import GameController from '../components/GameController'
import { Player } from '../components/types'

const timeFormat = {
    duration: 600, // seconds - 3 min
    increment: 5 // seconds
}

const playerW: Player<"w"> = {id: "1", name: "Mr. White", color: "w", type: "human"};
const playerB: Player<"b"> = {id: "2", name: "Mr. Black", color: "b", type: "human"};

const PlayOffline = () => {
    return (
            <GameController
                mode="offline"
                timeFormat={timeFormat}
                playerW={playerW}
                playerB={playerB}
                autoFlip={false}
            />
        
    )
}

export default PlayOffline
