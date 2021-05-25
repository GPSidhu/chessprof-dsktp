import React from 'react'
import styled from 'styled-components'

const TextContainer = styled.div`
    height: 80%;
    width: 50%;
    margin: auto;
    font-size: 32px;
    justify-content: center;
    text-align: center;
    p {
        color: #fff;
    }
`
const About = () => {
    return (
        <TextContainer>
            <b><i><h2>Welcome to ChessProf!!!</h2></i></b> <br/><br/>
            <p>It is your new friendly professor for learning chess.
            Learn various chess openings, practice puzzles, end game tactics and a lot more, all for <i><b>FREE</b></i>.
            Happy Learning. <br/>Enjoy :)
            </p>
        </TextContainer>
    )
}

export default About
