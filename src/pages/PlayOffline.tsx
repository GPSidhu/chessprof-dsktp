import React from 'react'

// src
import Chessboard from '../components/Chessboard/Chessboard'
import { VIEW } from '../constants'


const PlayOffline = () => {
    return (
        <div style={{ width: '800px', height: '800px' }}>
            <Chessboard
                showPanel={true}
                showResetButton={true}
                readOnly={false}
                fen=''
                pgn={''}
                view={VIEW.WHITE}
                controlConfig={{ override: false }}
            />
        </div>
    )
}

export default PlayOffline
