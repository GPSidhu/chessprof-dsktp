import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { resetBoard, setView } from '../../redux/actions'

// src
import { AppState, BoardState, PanelOverrides } from '../types'
import Board from './Board'
import ControlPanel from './ControlPanel'
import { VIEW } from '../../constants'

type Props = {
    children?: ReactNode
    showPanel?: boolean
    showResetButton?: boolean
    fen?: string | null | ''
    pgn?: string | null | ''
    view: VIEW
    readOnly?: boolean
    controlConfig: PanelOverrides
    onCheck?: () => void
    onCheckmate?: (winner: "w" | "b") => void
    onStalemate?: () => void
    onDraw?: () => void
    onPieceMove?: () => void
}

export type Ref = HTMLDivElement;

const Container = styled.div`
    display: inline-grid;
    grid-template-rows: auto 50px;
    grid-gap: 4px;
    max-width: 90vW;
    max-height: 90vH;
    min-width: 324px;
`
const BoardContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const PanelContainer = styled.div`
`

const Chessboard = ({
    view,
    fen,
    pgn,
    readOnly,
    showPanel,
    showResetButton,
    controlConfig,
    onCheckmate,
    onStalemate,
    onDraw,
    onCheck
}: Props) => {
    const dispatch = useDispatch();
    const { showSquareMarkings, showLegalMoves, inCheck, inCheckmate, inDraw, inStalemate, turn } = useSelector<AppState, BoardState>((state) => state.boardState);

    useEffect(() => {
        if (inCheckmate) {
            onCheckmate ? onCheckmate(turn === "b" ? "w" : "b")
                : alert("The " + (turn === "b" ? "White" : "Black") + " Won!");
        }

        if (inStalemate) {
            onStalemate ? onStalemate() : alert("Game drawn b stalemate!")
        }

        if (inDraw) {
            onDraw ? onDraw() : alert("Game drawn!")
        }

        if (inCheck) {
            onCheck ? onCheck() :
                console.log((turn === "w" ? "White" : "Black") + " king is in check");
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inCheck, inCheckmate, inStalemate, inDraw])

    useEffect(() => {
        // cleanup
        return () => {
            dispatch(resetBoard())
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(setView(view))
        console.log("New board initialized")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <BoardContainer className="board-container">
                <Board
                    showSquareNumber={showSquareMarkings}
                    showLegalMoves={showLegalMoves}
                    readOnly={readOnly}
                    fen={fen}
                    pgn={pgn}
                    config={controlConfig}
                />
            </BoardContainer>
            {   showPanel &&
                <PanelContainer>
                    <ControlPanel
                        showLegalMoves={!readOnly}
                        config={controlConfig}
                        showResetButton={showResetButton}
                    />
                </PanelContainer>
            }
        </Container>
    )
}

Chessboard.defaultProps = {
    fen: '',
    view: VIEW.WHITE,
    pgn: '',
    readOnly: false,
    showPanel: false
}

export default Chessboard
