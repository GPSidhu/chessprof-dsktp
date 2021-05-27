// router
import {
    Route
} from 'react-router-dom'

//redux imports
import { useSelector } from 'react-redux'

// src
import { AppState, OpeningState } from './types'
import Navbar from './Navbar'
import PlayOffline from '../pages/PlayOffline'
import Openings from '../pages/Openings'
import OpeningLayout from './OpeningViewer/OpeningLayout'
import styled from 'styled-components'
import About from '../pages/About'
import Endgame from '../pages/Endgame'
import Informational from './Informational'

// assets
import underConstruction from '../assets/illustrations/under_construction.svg'
import programming from '../assets/illustrations/programming.svg'
import Credits from '../pages/Credits'

const AppContainer = styled.div`
    width: 100vW;
    height: 100vH;
    display: grid;
    grid-template-columns: 200px auto;
`

const PageContainer = styled.div`
    display: inherit;
    height: auto;
    background: #8f8f8f;
    padding: 3rem;
    animation: fadeIn 0.8s;

    @keyframes fadeIn {
        0% {opacity:0;}
        50% {opacity:0;}
        100% {opacity:1;}
    }
`

function App() {
    let openingState = useSelector<AppState, OpeningState>(state => state.openingState);
    return (<AppContainer>
        <Navbar />
        <Route path="/" exact
            component={() => (
                <PageContainer className="page">
                    <About />
                </PageContainer>)}>
        </Route>
        <Route path="/openings" exact
            component={() => (
                <PageContainer className="page">
                    <Openings />
                </PageContainer>)}>
        </Route>
        <Route path="/endgame" exact
            component={() => (
                <PageContainer className="page">
                    <Endgame />
                </PageContainer>)}>
        </Route>
        <Route path="/practice" exact
            component={
                () => (
                    <PageContainer className="page">
                        <Informational
                            heading={"Practice"}
                            content={"Coming Soon .... "}
                            illustration={programming} />
                    </PageContainer>)
            }></Route>
        <Route
            path="/puzzles" exact
            component={
                () => (
                    <PageContainer className="page">
                        <Informational
                            heading={"Puzzles"}
                            content={"Coming soon ...."}
                            illustration={underConstruction} />
                    </PageContainer>)

            }></Route>
        <Route
            path="/play-online" exact
            component={
                () => (
                    <PageContainer className="page">
                        <Informational
                            heading={"Play Online"}
                            content={"Coming soon ...."}
                            illustration={underConstruction} />
                    </PageContainer>)
            } ></Route>
        <Route path="/play-offline" exact
            component={() => (
                <PageContainer><PlayOffline /></PageContainer>
            )}></Route>
        <Route path={`/openings/${openingState.opening.id}`} exact
            component={
                () => (
                    <PageContainer className="page">
                        <OpeningLayout opening={openingState.opening} />
                    </PageContainer>
                )}></Route>
        <Route path="/credits" exact
            component={
                () => (
                    <PageContainer className="page">
                        <Credits />
                    </PageContainer>
                )} ></Route>
    </AppContainer>
    );
}

export default App;
