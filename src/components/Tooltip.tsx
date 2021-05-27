import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'


interface Props {
    children: ReactNode
    text?: string
    position?: "top" | "bottom" | "left" | "right"
}

const tooltipColor = '#363535';
const tooltipTextColor = '#fff';

const TooltipContainer = styled.span`
    position: relative;
    .tooltip-trigger {
        display: inline-block;
        text-decoration: underline;
        &::hover {
            opacity: 1;
        }
    }
    .tooltip-top {
        bottom: 100%;
        left: 50%;
        padding-bottom: 9px;
        transform: translateX(-50%);
        animation: fadeIn 0.7s;
        -webkit-animation: fadeIn 1s;
        -moz-animation: fadeIn 1s;
        -o-animation: fadeIn 1s;
        -ms-animation: fadeIn 1s;

        @keyframes fadeIn {
            0% {opacity:0;}
            50% {opacity:0;}
            100% {opacity:1;}
        }
        @-moz-keyframes fadeIn {
            0% {opacity:0;}
            50% {opacity:0;}
            100% {opacity:1;}
          }
          
          @-webkit-keyframes fadeIn {
            0% {opacity:0;}
            50% {opacity:0;}
            100% {opacity:1;}
          }
          
          @-o-keyframes fadeIn {
            0% {opacity:0;}
            50% {opacity:0;}
            100% {opacity:1;}
          }
          
          @-ms-keyframes fadeIn {
            0% {opacity:0;}
            50% {opacity:0;}
            100% {opacity:1;}
          }

        &::after {
          border-left: 9px solid transparent;
          border-right: 9px solid transparent;
          border-top: 9px solid ${tooltipColor};
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
    }
    .tooltip-bubble {
        max-width: 100px;
        position: absolute;
        z-index: 10;
        &::after {
          content: '';
          position: absolute;
        }
    }
    .tooltip-message {
        background: ${tooltipColor};
        border-radius: 3px;
        color: ${tooltipTextColor};
        font-size: .75rem;
        line-height: 1.4;
        padding: .75em;
        text-align: center;
    }
`
const Tooltip = ({
    text,
    position,
    children
}: Props) => {
    const [visible, setVisible] = useState(false)
    if (!position) position = 'top'

    return (
        <TooltipContainer onMouseLeave={() => setVisible(false)}>
            {visible &&
                <div className={`tooltip-bubble tooltip-${position}`}>
                    <div className='tooltip-message'>{text}</div>
                </div>
            }
            <span className='tooltip-trigger' onMouseOver={() => setVisible(true)}>
                {children}
            </span>
        </TooltipContainer>
    )
}

export default Tooltip
