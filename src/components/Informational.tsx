import React from 'react'
import styled, { CSSProperties } from 'styled-components'

interface Props {
    heading?: string
    content?: string
    illustration?: string
    style?: CSSProperties
}

export const Row = styled.div`
    display: grid;
    grid-template-areas: 'info' 'pic';
    grid-template-rows: 2fr 3fr;

    @media screen and (max-width: 768px) {
        grid-template-areas: 'info' 'pic';
        grid-template-rows: auto;
        grid-auto-rows: auto 3fr;
    }
`

export const Info = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: info;
    display: flex;
    justify-content: center;
`

export const TextWrapper = styled.div`
    max-width: 840px;
    padding-top: 0;
    padding-bottom: 60px;
    font-family: fantasy;
    color: #ebe9e6;
    @media screen and (max-width: 480px) {
        max-width: 340px;
    }
`

export const Heading = styled.div`
    margin-bottom: 24px;
    font-size: 38px;
    line-height: 1.1;
    font-weight 600;
    text-align: center;
    @media screen and (max-width: 480px) {
        font-size: 24px;
    }
`

export const Paragraph = styled.p`
    font-size: 24px;
    text-align: center;
    @media screen and (max-width: 480px) {
        font-size: 14px;
    }
`

export const IllustrationWrapper = styled.div`
    max-width: 1100px;
    height: 100%;
    display: flex;
    justify-content: center;
    justify-self: center;
`

export const Img = styled.img`
    width: 70%;
    border-radius: 50%;
    margin: 0 0 10px 0;
    padding-right: 0;
    @media screen and (max-width: 480px) {
       width: 100%;
    }
`


const Informational = ({
    heading,
    content,
    illustration,
    style
}: Props) => {

    return (
        <div>
            <Row>
                <Info>
                    <TextWrapper>
                        {heading && <Heading>{heading}</Heading>}
                        {content && <Paragraph>{content}</Paragraph>}
                    </TextWrapper>
                </Info>
                <IllustrationWrapper>
                    <Img src={illustration} alt={''}></Img>
                </IllustrationWrapper>
            </Row>
        </div>
    )
}

export default Informational
