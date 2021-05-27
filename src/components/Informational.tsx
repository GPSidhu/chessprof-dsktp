import React, { ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'

interface Props {
    children?: ReactNode
    heading?: string
    content?: string
    illustration?: string
    style?: CSSProperties
}

export const Row = styled.div`
    position: relative;
    display: grid;
    grid-template-areas: 'info' 'pic';
    grid-template-rows: 2fr 3fr;

    @media screen and (max-width: 768px) {
        grid-template-areas: 'info' 'pic';
        grid-template-rows: auto;
        grid-auto-rows: auto 3fr;
    }

    .children {
        display: flex;
        justify-content: center;
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

export const Illustration = styled.img`
    z-index: 0;
    max-width: 800px;
    display: flex;
    justify-content: center;
    justify-self: center;
`

const Informational = ({
    heading,
    content,
    illustration,
    style,
    children
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
                {children && <div className="children">
                    {children}
                </div>
                }
                {
                    illustration &&
                    <Illustration src={illustration} alt={"illustration.svg"} />
                }
            </Row>

        </div>
    )
}

export default Informational
