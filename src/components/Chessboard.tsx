import { ReactNode } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { BoardState } from './types'
import Board from './Board'
import ControlPanel from './ControlPanel';

type Props = { children?: ReactNode }
export type Ref = HTMLDivElement;

const Container = styled.div`
    // margin: auto;
    display: flex;
    flex-direction: row;
    // grid-template-columns: 2fr 1fr;
    // grid-gap: 24px;
    padding: 1rem;
    max-width: 90vW;
    max-height: 90vH;
`
const BoardContainer = styled.div`
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const PanelContainer = styled.div`

`

const Chessboard = (props: Props) => {
    const view = useSelector<BoardState, BoardState["view"]>((state) => state.view);
    const showMarkings = useSelector<BoardState, BoardState["showSquareMarkings"]>((state) => state.showSquareMarkings);
    const showMoveIndicator = useSelector<BoardState, BoardState["showLegalMoves"]>((state) => state.showLegalMoves);

    return (
        <Container>
            <BoardContainer className="board-container">
                <Board
                    view={view}
                    showSquareNumber={showMarkings}
                    showLegalMoves={showMoveIndicator}
                />
            </BoardContainer>
            <PanelContainer>
                <ControlPanel />
            </PanelContainer>
        </Container>
    )
}

export default Chessboard
