import React from 'react'
import Chessboard from '../components/Chessboard'
import { VIEW } from '../constants'

const pgn = `[Event "Live Chess"]
[Site "Chess.com"]
[Date "2021.05.21"]
[Round "?"]
[White "gurrii"]
[Black "Ceer0es3"]
[Result "1-0"]
[ECO "D00"]
[WhiteElo "1345"]
[BlackElo "1318"]
[TimeControl "180+2"]
[EndTime "8:01:07 PDT"]

1. d4 d5 2. e4 dxe4 3. Nc3 Nf6 4. f3 exf3 5. Qxf3 Bg4 6. Qxb7 Qxd4 7. Qxa8 Qe5+
8. Nge2 Nd7 9. Qe4 Qh5 10. Bf4 e5 11. Bg3 Bb4 12. O-O-O Bxc3 13. Nxc3 Bxd1 14.
Nxd1 O-O 15. Bd3 Na6 16. a3 Nac5 17. Qe3 Nxd3+ 18. Qxd3 Nf6 19. Kb1 e4 20. Qc3
Re8 21. Ne3 Qe2 22. Re1 Qh5 23. Qxc7 Ng4 24. Qd7 Rf8 25. Qxg4`

const Home = () => {
    return (
        <div style={{ width: '800px', height: '800px' }}>
            <Chessboard
                showPanel={true}
                readOnly={false}
                fen=''
                pgn={''}
                view={VIEW.WHITE}
                // next={() => {
                //     alert('next clicked');
                //     return null
                // }}
            />
        </div>
    )
}

export default Home
