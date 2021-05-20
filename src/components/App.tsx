// import { ReactElement, ReactNode } from "react";
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
    width: 100%;
    height: 100%;
    background: #8f8f8f;
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

// conventional props
// function Header({children}: {children: ReactNode}): ReactElement | null {
//     return <h1>{children}</h1>
// }

//default props
// const defaultContainerProps = {
//     heading: <strong>Default Heading</strong>
// }
// type ContainerProps = {children: ReactNode} & typeof defaultContainerProps;
// function Container({heading, children}: ContainerProps): ReactElement | null{
//     return <div><h1>{heading}</h1>{children}</div>
// }
// Container.defaultProps = defaultContainerProps;
