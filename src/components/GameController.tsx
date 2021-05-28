import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { VIEW } from '../constants'
import Chessboard from './Chessboard/Chessboard'
import { AppState, BoardState, GameState, Player } from './types'
import { loadNewGame, setView } from '../redux/actions'
import Timer from './Timer'

export interface GameControllerProps {
    mode: "offline" | "online"
    timeFormat: { duration: number, increment: number }
    playerW: Player<"w">
    playerB: Player<"b">
    autoFlip?: boolean // auto flip the board for the side having current turn
}

// const GameContainer = styled.div`
//     display: block;
//     // height: 800px;
//     width: 800px;
// `

interface GameWrapperProps {
    dir: "column" | "column-reverse"
}
const GameWrapper = styled.div`
    display: flex;
    flex-direction: ${(props: GameWrapperProps) => props.dir};
    justify-content: center;
    align-items: center;
`
const UserPanel = styled.div`
    width: 800px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid grey;
    background: lightgrey;
    padding: 4px;
    border-radius: 4px;
    margin: 4px;

    .user {
        font-size: 24px;
        font-weight: bold;
        color: #5c5c5c;
    }
`

// update game state
// start timer as white moves the first move
const GameController = (props: GameControllerProps) => {
    const dispatch = useDispatch()
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const { turn, history, view } = useSelector<AppState, BoardState>((state) => state.boardState);
    const { playerB, playerW } = useSelector<AppState, GameState>((state) => state.gameState);
    const [prevTurn, setPrevTurn] = useState<"w" | "b">(turn);

    const onGameOver = (outcome: "win" | "stalemate" | "draw", winner?: string) => {
        switch (outcome) {
            case "win": alert("This is play offline: winner is " + winner)
                return;
            case "stalemate": alert("This is play offline: Game drawn by Stalemate")
                return;
            case "draw": alert("This is play offline: Game drawn")
                return;
        }
    }

    useEffect(() => {
        //load game state and update session storage
        dispatch(loadNewGame({
            ...props
        }))
        return () => {
            // if (!isGameOver)
            //     alert("Game is on.. are you sure you want to leave the page?")
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        debugger
        if (!isGameStarted && turn === "b" && history.length > 1) {
            setIsGameStarted(true);
        }
        if (props.autoFlip && turn !== prevTurn) {
            setPrevTurn(turn)
            setTimeout(() => dispatch(setView(turn === "w" ? VIEW.WHITE : VIEW.BLACK)), 100)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [turn, history])


    const onTimeout = (id: string | number) => {
        debugger
        setIsGameOver(true)
        alert((id === "w" ? "White" : "Black") + " ran out of time.")
        // udpate game state
        // show dialog box, with play and close button
    }

    return (
        <div className="game-container">
            <GameWrapper className="game-wrapper" dir={view === VIEW.WHITE ? 'column' : 'column-reverse'}>
                <UserPanel className="playerB">
                    <div className="user">{props.playerB.name}</div>
                    <div>
                        <Timer
                            id={"b"}
                            startTime={playerB?.timer || props.timeFormat.duration}
                            on={!isGameOver && isGameStarted && turn === "b"}
                            onTimeout={(id: string | number) => onTimeout(id)}
                        />
                    </div>
                </UserPanel>
                <div className="game-board" style={{ width: '500px', height: 'auto' }}>
                    <Chessboard
                        showPanel={true}
                        showResetButton={false}
                        readOnly={isGameOver}
                        fen=''
                        pgn={''}
                        view={VIEW.WHITE}
                        controlConfig={{ override: false }}
                        onCheckmate={(winner) => onGameOver("win", winner)}
                        onStalemate={() => onGameOver("stalemate")}
                        onDraw={() => onGameOver("draw")}
                    />
                </div>
                <UserPanel className="playerW">
                    <div className="user">{props.playerW.name}</div>
                    <div>
                        <Timer
                            id={"w"}
                            startTime={playerW?.timer || props.timeFormat.duration}
                            on={!isGameOver && isGameStarted && turn === "w"}
                            onTimeout={(id: string | number) => onTimeout(id)}
                        />
                    </div>
                </UserPanel>
            </GameWrapper>
        </div>
    )
}

export default GameController
