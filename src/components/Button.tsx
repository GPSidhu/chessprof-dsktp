import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { VARIANT_MAP, SIZE_MAP, ICON_COMP_MAP } from '../constants'

interface ButtonProps {
    children?: ReactNode
    variant: "primary" | "secondary" | "tertiary"
    size: "sm" | "md" | "lg"
    icon?: string // to do - icon support with button
    onClick: () => void
}

const GenericButton = styled.button`
    border-radius: 5px;
    min-width: ${(props: ButtonProps) => (props.icon ? '0px' : SIZE_MAP[props.size].width) + 'px'};
    min-height: ${(props: ButtonProps) => (props.icon ? '0px' : SIZE_MAP[props.size].height) + 'px'};
    font-size: ${(props: ButtonProps) => SIZE_MAP[props.size].text + 'px'};
    background: ${(props: ButtonProps) => VARIANT_MAP[props.variant].bg};
    color: ${(props: ButtonProps) => VARIANT_MAP[props.variant].color};
    font-weight: bold;
    border-style: none;
    cursor: pointer;
    &:hover {
        background: rgba(255, 255, 255, 0.25);
    }
`
const Button = (props: ButtonProps) => {
    return (
        <GenericButton variant={props.variant} size={props.size} onClick={() => props.onClick()}>
            {props.icon && ICON_COMP_MAP[props.icon] && ICON_COMP_MAP[props.icon].icon}
            {!props.icon && props.children}
        </GenericButton>
    )
}

Button.defaultProps = {
    variant: "primary",
    size: "md",
}

export default Button
