import { createRef, ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { VIEW } from '../constants/enums';
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

    useEffect(() => {
    }, []);
    return (
        <HomeWrapper>
            <BoardContainer className="board-container" ref={thisRef}>
                <Board parent={thisRef} />
            </BoardContainer>
            <PanelContainer>
                <ControlPanel />
            </PanelContainer>
        </HomeWrapper>
    )
}

export default Home
