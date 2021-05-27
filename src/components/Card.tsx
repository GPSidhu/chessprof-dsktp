import React, { ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'
// router
import { Link } from 'react-router-dom'

// src
import { VARIANT_MAP } from '../constants'

interface Props {
    title?: string
    subTitle?: string
    header?: ReactNode | ReactNode[]
    children?: ReactNode
    footer?: ReactNode
    style?: CSSProperties
    variant?: "primary" | "secondary" | "tertiary"
    onClick?: () => void
    interaction?: string | null
    to: string
    // component: () => ReactElement
}

const CardWrapper = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    border: 2px solid grey;
    min-height: 100px;
    min-width: 100px;
    max-width: 500px;
    border-radius: 4px;
    text-decoration: none;
    padding: 12px;
    color: ${(props: Props) => props.variant ? VARIANT_MAP[props.variant].color : '#000'};
    background: ${(props: Props) => props.variant ? VARIANT_MAP[props.variant].bg : 'transparent'};
    cursor: ${(props: Props) => props.interaction ? 'pointer' : 'auto'};
    transition: transform .3s;
    &:hover {
        transform: scale(1.12);
    }
`
const CardHeader = styled.div`
    display: inline-grid;
    padding: 8px 0;
    flex: 1;
`

const CardBody = styled.div`
    flex: 1;
    font-size: 12px;
    display: flex;
    justify-content: center;
`
const CardFooter = styled.div`
    margin-top: 8px;
    flex: 0;
`
const CardTitle = styled.div`
    display: inline-block;
    font-size: 24px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: wrap;
    overflow: hidden;
    text-align: center;
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

const Card = ({
    title,
    subTitle,
    header,
    children,
    footer,
    style,
    variant,
    onClick,
    interaction,
    to,
}: Props) => {
    return (
        <CardWrapper
            style={style}
            variant={variant}
            interaction={interaction}
            onClick={() => { interaction && onClick && onClick() }}
            to={to}
        >
            <CardHeader>
                {renderHeader(title, subTitle, header)}
            </CardHeader>
            <CardBody>{children}</CardBody>
            <CardFooter>{footer}</CardFooter>
        </CardWrapper>
    )
}

Card.defaultProps = {
    variant: "secondary",
    interaction: 1
}

export default Card
