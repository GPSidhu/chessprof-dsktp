import {
    Route
} from 'react-router-dom'
import Navbar from './Navbar'
import Home from './Home'
import styled from 'styled-components'

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
            {/* <Route path="/" component={Openings} exact></Route> */}
        </PageContainer>
    </AppContainer>
    );
}

export default App;
