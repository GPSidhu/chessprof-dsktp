import {
    Route
} from 'react-router-dom'
import Navbar from './Navbar'
import Home from '../pages/Home'
import Openings from '../pages/Openings'
import styled from 'styled-components'
import About from '../pages/About'

const AppContainer = styled.div`
    width: 100vW;
    display: grid;
    grid-template-columns: 200px auto;
`

const PageContainer = styled.div`
    display: inherit;
    width: 100%;
    height: auto;
    background: #8f8f8f;
    padding: 3rem;
`

function App() {
    return (<AppContainer>
        <Navbar />
        <PageContainer>
            <Route path="/home" component={Home} exact></Route>
            <Route path="/openings" component={Openings} exact></Route>
            <Route path="/about" component={About} exact></Route>
        </PageContainer>
    </AppContainer>
    );
}

export default App;
