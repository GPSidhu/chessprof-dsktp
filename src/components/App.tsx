import {
    Route
} from 'react-router-dom'
//redux imports
import { useSelector } from 'react-redux'
import { AppState, OpeningState } from './types'
import Navbar from './Navbar'
import PlayOffline from '../pages/PlayOffline'
import Openings from '../pages/Openings'
import OpeningLayout from './OpeningViewer/OpeningLayout'
import styled from 'styled-components'
import About from '../pages/About'
import Endgame from '../pages/Endgame'
import Informational from './Informational'
import underConstruction from '../assets/illustrations/under_construction.svg'
import programming from '../assets/illustrations/programming.svg'

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
`

function App() {
    let openingState = useSelector<AppState, OpeningState>(state => state.openingState);
    return (<AppContainer>
        <Navbar />
        <PageContainer className="page">
            <Route path="/" component={About} exact></Route>
            <Route path="/openings" component={Openings} exact></Route>
            <Route path="/endgame" component={Endgame} exact></Route>
            <Route
                path="/practice" exact
                component={
                    () => (<Informational
                        heading={"Practice"}
                        content={"Coming Soon .... "}
                        illustration={programming} />)
                }></Route>
            <Route
                path="/puzzles" exact
                component={
                    () => (<Informational
                        heading={"Puzzles"}
                        content={"Coming soon ...."}
                        illustration={underConstruction} />)

                }></Route>
            <Route
                path="/play-online" exact
                component={
                    () => (<Informational
                        heading={"Play Online"}
                        content={"Coming soon ...."}
                        illustration={underConstruction} />)
                } ></Route>
            <Route path="/play-offline" component={PlayOffline} exact></Route>
            <Route
                path={`/openings/${openingState.opening.id}`}
                component={() => <OpeningLayout opening={openingState.opening} />}
            ></Route>
        </PageContainer>
    </AppContainer>
    );
}

export default App;
