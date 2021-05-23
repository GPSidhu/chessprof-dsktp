import React, { ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { VARIANT_MAP } from '../constants'

interface Props {
    title?: string
    subTitle?: string
    header?: ReactNode | ReactNode[]
    children?: ReactNode
    footer?: ReactNode
    style?: CSSProperties
    variant?: "primary" | "secondary" | "tertiary"
}

const CardWrapper = styled.div`
    border: 2px solid grey;
    min-height: 100px;
    min-width: 100px;
    max-width: 500px;
    border-radius: 8px;
    background: ${(props: Props) => props.variant ? VARIANT_MAP[props.variant].bg : 'transparent'};
    cursor: pointer;
    &:hover {
        background: rgba(255, 255, 255, 0.25);
    }
`
const CardHeader = styled.div`
    padding: 8px;
    flex: 0;
    color: #fff;
`

const CardBody = styled.div`
    flex: 1;
    font-size: 12px;
`
const CardFooter = styled.div`
    margin-top: 8px;
    flex: 0;
`
const CardTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`
const CardSubTitle = styled.div`
    font-size: 16px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const renderHeader = (title: string | undefined, subTitle: string | undefined, header: ReactNode): ReactNode | ReactNode[] => {
    if (header)
        return header;

    let elems = [];
    if (title && typeof title === 'string') {
        elems.push(<CardTitle key={'o_title'}>{title}</CardTitle>);
    }
    if (subTitle && typeof subTitle === 'string') {
        elems.push(<CardSubTitle key={'1_subtitle'}>{subTitle}</CardSubTitle>)
    }
    return elems;
}

const Card = ({ title, subTitle, header, children, footer, style, variant }: Props) => {
    return (
        <CardWrapper style={style} variant={variant}>
            <CardHeader>
                {renderHeader(title, subTitle, header)}
            </CardHeader>
            <CardBody>{children}</CardBody>
            <CardFooter>{footer}</CardFooter>
        </CardWrapper>
    )
}

Card.defaultProps = {
    variant: "secondary"
}

export default Card
