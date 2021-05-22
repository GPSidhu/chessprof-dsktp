import { createRef, ReactNode } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { BoardState } from './types'
import Board from './Board'
import ControlPanel from './ControlPanel';

type Props = { children: ReactNode }
export type Ref = HTMLDivElement;

const HomeWrapper = styled.div`
    margin: auto;
    display: grid;
    grid-template-columns: 70% auto;
    grid-gap: 24px;
    width: 100%;
    height: 100%;
    padding: 1rem;
`
const BoardContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const PanelContainer = styled.div`

`

const Home = (props: Props) => {
    const thisRef = createRef<HTMLDivElement>();
    const view = useSelector<BoardState, BoardState["view"]>((state) => state.view);
    const showMarkings = useSelector<BoardState, BoardState["showSquareMarkings"]>((state) => state.showSquareMarkings);
    const showMoveIndicator = useSelector<BoardState, BoardState["showLegalMoves"]>((state) => state.showLegalMoves);

    return (
        <HomeWrapper>
            <BoardContainer className="board-container" ref={thisRef}>
                <Board
                    parent={thisRef}
                    view={view}
                    showSquareNumber={showMarkings}
                    showLegalMoves={showMoveIndicator}
                />
            </BoardContainer>
            <PanelContainer>
                <ControlPanel />
            </PanelContainer>
        </HomeWrapper>
    )
}

export default Home
