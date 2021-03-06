import React from 'react'
import styled from 'styled-components'

const TextContainer = styled.div`
    height: 90%;
    width: 50%;
    margin: auto;
    font-size: 24px;
    
    justify-content: center;
    text-align: center;
    h2 {
        font-size: 38px;
        font-family: "Dancing script";
    }
    p {
        color: #fff;
        font-family: "Mali";
    }
`
const About = () => {
    return (
        <TextContainer>
            <b><i><h2>Welcome to ChessProf!!!</h2></i></b> <br/>
            <p>
            If you got bored from watching long chess videos, and don't wanna spend '$$' in premium subscriptions, then this is just the right place for you.
            <br/><br/>
            <b><i>ChessProf</i></b> is your new friendly professor for learning chess.
            Learn various chess openings, practice puzzles, end game tactics and a lot more, in a new interactive way like never before and  all of that for <i><b>FREE</b></i>.
            <br/><br/>Happy Learning. <br/>Enjoy :)
            </p>
        </TextContainer>
    )
}

export default About
