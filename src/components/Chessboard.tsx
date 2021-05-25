import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { AppState, BoardState, NextMove } from './types'
import Board from './Board'
import ControlPanel from './ControlPanel'
import { Move } from 'chess.js'
import { VIEW } from '../constants'
import { setView } from '../redux/actions'

type Props = {
    children?: ReactNode
    showPanel?: boolean
    fen?: string | null | ''
    pgn?: string | null | ''
    view: VIEW
    readOnly?: boolean
    next?: () => NextMove | null
}
export type Ref = HTMLDivElement;

const Container = styled.div`
    display: inline-grid;
    grid-template-rows: auto 50px;
    grid-gap: 4px;
    padding: 1rem;
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

const Chessboard = ({view, fen, pgn, readOnly, showPanel, next}: Props) => {
    const dispatch = useDispatch();
    const showMarkings = useSelector<AppState, BoardState["showSquareMarkings"]>((state) => state.boardState.showSquareMarkings);
    const showMoveIndicator = useSelector<AppState, BoardState["showLegalMoves"]>((state) => state.boardState.showLegalMoves);

    useEffect(() => {
        dispatch(setView(view))
        console.log("New board initialized")
    }, [dispatch, view])

    return (
        <Container>
            <BoardContainer className="board-container">
                <Board
                    showSquareNumber={showMarkings}
                    showLegalMoves={showMoveIndicator}
                    readOnly={readOnly}
                    fen={fen}
                    pgn={pgn}
                />
            </BoardContainer>
            {   showPanel && 
                <PanelContainer>
                    <ControlPanel showLegalMoves={!readOnly} next={next}/>
                </PanelContainer>
            }
        </Container>
    )
}

Chessboard.defaultProps = {
    fen: '', //'r1bqkbnr/pppppppp/2n1pn2/8/4P3/3P1N2/PPP2PPP/RNBQKBNR w KQkq - 0 1', // -> not needed as new Chess() will initialize board with this fen
    view: VIEW.WHITE,
    pgn: '',
    readOnly: false,
}

export default Chessboard
