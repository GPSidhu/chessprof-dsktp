import React, { ReactNode } from 'react'
import styled from 'styled-components'

//src
import { VARIANT_MAP, SIZE_MAP, ICON_COMP_MAP } from '../constants'

interface ButtonProps {
    children?: ReactNode
    variant: "primary" | "secondary" | "tertiary"
    size: "sm" | "md" | "lg"
    icon?: string
    label?: string
    tooltipText?: string
    onClick: () => void
}

const GenericButton = styled.button`
    border-radius: 5px;
    height: ${(props: ButtonProps) => props.icon ? (SIZE_MAP[props.size].height + 'px') : 'auto'};
    min-width: ${(props: ButtonProps) => (props.icon ? '0px' : SIZE_MAP[props.size].width) + 'px'};
    min-height: ${(props: ButtonProps) => (props.icon ? '0px' : SIZE_MAP[props.size].height) + 'px'};
    font-size: ${(props: ButtonProps) => SIZE_MAP[props.size].text + 'px'};
    background: ${(props: ButtonProps) => VARIANT_MAP[props.variant].bg};
    color: ${(props: ButtonProps) => VARIANT_MAP[props.variant].color};
    font-weight: bold;
    border-style: none;
    cursor: pointer;
    padding: 4px;
    &:hover {
        background: rgba(255, 255, 255, 0.25);
    }
`
const ButtonIcon = styled.button`
    display: inline-flex;
    border-radius: 5px;
    padding: 4px;
    font-size: ${(props: ButtonProps) => SIZE_MAP[props.size].text + 'px'};
    background: ${(props: ButtonProps) => VARIANT_MAP[props.variant].bg};
    color: ${(props: ButtonProps) => VARIANT_MAP[props.variant].color};
    font-weight: bold;
    border-style: none;
    cursor: pointer;
    align-items: center;
    vertical-align: middle;
    &:hover {
        background: rgba(255, 255, 255, 0.25);
    }
`
const Button = (props: ButtonProps) => {
    if (props.icon && ICON_COMP_MAP[props.icon]) {
        return (<ButtonIcon variant={props.variant} size={props.size} onClick={() => props.onClick()}>
                {ICON_COMP_MAP[props.icon].icon}
            </ButtonIcon>
        )
    }
    return (
        <GenericButton variant={props.variant} size={props.size} onClick={() => props.onClick()}>
            {props.children}
        </GenericButton>
    )
}

Button.defaultProps = {
    variant: "primary",
    size: "md",
}

export default Button
