import React from 'react'
import styled from 'styled-components'

// redux
import { useDispatch } from 'react-redux'
import {
    firstMove,
    latestMove,
    nextMove,
    previousMove,
    resetBoard,
    rotateBoard,
    toggleMarkings,
    toggleMoveIndicator
} from '../../redux/actions'

// src
import Button from '../Button'
import { PanelOverrides } from '../types'
import Tooltip from '../Tooltip'

interface Props {
    showSquareMarkings?: boolean
    showLegalMoves?: boolean
    showStepButtons?: boolean
    showResetButton?: boolean
    config?: PanelOverrides
    next?: () => void
    prev?: () => void
}

const PanelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    background: darkgrey;
`

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    > * {
        margin: 8px;
    }
`

const ControlPanel = ({
    showLegalMoves,
    showSquareMarkings,
    showStepButtons,
    showResetButton,
    config
}: Props) => {
    const dispatch = useDispatch();
    const defaultNext = () => dispatch(nextMove())
    const defaultPrev = () => dispatch(previousMove())

    return (
        <PanelWrapper>
            <ButtonGroup>
                <Tooltip text={"Rotate"}><Button icon="rotate" size="md" tooltipText="Rotate" variant="secondary" onClick={() => dispatch(rotateBoard())} /></Tooltip>
                {showSquareMarkings && 
                    <Tooltip text={"Toggle Markings"}><Button icon="marker" size="md" variant="secondary" onClick={() => dispatch(toggleMarkings())}>Toggle Markings</Button></Tooltip>}
                {showLegalMoves && 
                    <Tooltip text={"Show Legal Moves"}><Button icon="validate" size="md" variant="secondary" onClick={() => dispatch(toggleMoveIndicator())}>Toggle Move Indicator</Button></Tooltip>}
                {showResetButton &&
                    <Tooltip text={"Reset Board"}><Button icon="reset" size="md" variant="secondary" onClick={() => dispatch(resetBoard())}>Reset</Button></Tooltip>}
            </ButtonGroup>
            {showStepButtons &&
                <ButtonGroup>
                    <Tooltip text={"First Move"}><Button icon="fast-backward" size="md" tooltipText="First Move" variant="secondary" onClick={() => config?.override ? config.first() : dispatch(firstMove())}>First move</Button></Tooltip>
                    <Tooltip text={"Previous Move"}><Button icon="backward" size="md" variant="secondary" onClick={() => config?.override ? config.prev() : defaultPrev()}>Previous move</Button></Tooltip>
                    <Tooltip text={"Next Move"}><Button icon="forward" size="md" variant="secondary" onClick={() => config?.override ? config.next() : defaultNext()}>Next Move</Button></Tooltip>
                    <Tooltip text={"Latest Move"}><Button icon="fast-forward" size="md" variant="secondary" onClick={() => config?.override ? config.latest() : dispatch(latestMove())}>Latest Move</Button></Tooltip>
                </ButtonGroup>
            }
        </PanelWrapper>
    )
}

ControlPanel.defaultProps = {
    showSquareMarkings: true,
    showLegalMoves: true,
    showStepButtons: true,
    showResetButton: false
}

export default ControlPanel
