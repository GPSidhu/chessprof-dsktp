import React, { ReactNode } from 'react'
import styled from 'styled-components'

const SIZE_MAP: {[key:string]: {width: number, height: number, text: number}}  = {
    "sm": {width: 34, height: 24, text: 12},
    "md": {width: 88, height: 34, text: 18},
    "lg": {width: 98, height: 44, text: 22},
}

const VARIANT_MAP: {[key: string]: {bg: string, color: string}} = {
    "primary": {bg: "#537133;", color: "rgba(255, 255, 255, 0.65)"},
    "secondary": {bg: "#666463", color: "rgba(255, 255, 255, 0.65)"},
    "tertiary": {bg: "black", color: "rgba(255, 255, 255, 0.65)"}
}

interface ButtonProps {
    children?: ReactNode
    variant: "primary" | "secondary" | "tertiary"
    size: "sm" | "md" | "lg"
    type?: "button" // to do - | "icon"
    icon?: string // to do - icon support with button
    onClick: () => void
}

const GenericButton = styled.button`
    border-radius: 5px;
    min-width: ${(props: ButtonProps) => SIZE_MAP[props.size].width+'px'};
    min-height: ${(props: ButtonProps) => SIZE_MAP[props.size].height+'px'};
    font-size: ${(props: ButtonProps) => SIZE_MAP[props.size].text+'px'};
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
            {props.children}
        </GenericButton>
    )
}

Button.defaultProps = {
    variant: "primary",
    size: "md",
    type: "button"
}

export default Button
