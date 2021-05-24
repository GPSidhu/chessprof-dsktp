import React from 'react'
import Chessboard from '../components/Chessboard'
import { VIEW } from '../constants'

const Home = () => {
    return (
        <div style={{width: '800px', height: '800px'}}>
            <Chessboard
                showPanel={true}
                readOnly={false}
                fen=''
                pgn=''
                view={VIEW.WHITE}
            />
        </div>
    )
}

export default Home
