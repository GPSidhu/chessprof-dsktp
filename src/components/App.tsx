import {
    Route
} from 'react-router-dom'
//redux imports
import { useSelector } from 'react-redux'
import { AppState, OpeningState } from './types'
import Navbar from './Navbar'
import Home from '../pages/Home'
import Openings from '../pages/Openings'
import OpeningLayout from './OpeningViewer/OpeningLayout'
import styled from 'styled-components'
import About from '../pages/About'

const AppContainer = styled.div`
    width: 100vW;
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
            <Route path="/home" component={Home} exact></Route>
            <Route path="/openings" component={Openings} exact></Route>
            <Route path="/about" component={About} exact></Route>
            <Route
                path={`/openings/${openingState.opening.id}`}
                component={() => <OpeningLayout opening={openingState.opening}/>}
            ></Route>
        </PageContainer>
    </AppContainer>
    );
}

export default App;
