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

const Chessboard = ({ view, fen, pgn, readOnly, showPanel, showResetButton, controlConfig }: Props) => {
    const dispatch = useDispatch();
    const showMarkings = useSelector<AppState, BoardState["showSquareMarkings"]>((state) => state.boardState.showSquareMarkings);
    const showMoveIndicator = useSelector<AppState, BoardState["showLegalMoves"]>((state) => state.boardState.showLegalMoves);

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
                    showSquareNumber={showMarkings}
                    showLegalMoves={showMoveIndicator}
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
