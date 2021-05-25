import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Button from './Button'
import { firstMove, latestMove, nextMove, previousMove, rotateBoard, toggleMarkings, toggleMoveIndicator } from '../redux/actions'
import { NextMove } from './types'

interface Props {
    showSquareMarkings?: boolean
    showLegalMoves?: boolean
    showStepButtons?: boolean
    next?: () => NextMove | null
}

const PanelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 4px;
    background: darkgrey;
    > * {
        margin: 8px;
    }
`
const ControlPanel = ({ showLegalMoves, showSquareMarkings, showStepButtons, next }: Props) => {
    const dispatch = useDispatch();
    const defaultNext = () => dispatch(nextMove())
    return (
        <PanelWrapper>
            <Button icon="rotate" size="md" variant="secondary" onClick={() => dispatch(rotateBoard())} />
            {showSquareMarkings && <Button icon="marker" size="md" variant="secondary" onClick={() => dispatch(toggleMarkings())}>Toggle Markings</Button>}
            {showLegalMoves && <Button icon="validate" size="md" variant="secondary" onClick={() => dispatch(toggleMoveIndicator())}>Toggle Move Indicator</Button>}
            {showStepButtons &&
                <>
                    <Button icon="fast-backward" size="md" variant="secondary" onClick={() => dispatch(firstMove())}>Toggle Move Indicator</Button>
                    <Button icon="backward" size="md" variant="secondary" onClick={() => dispatch(previousMove())}>Toggle Move Indicator</Button>
                    <Button icon="forward" size="md" variant="secondary" onClick={() => next ? next() : defaultNext() }>Toggle Move Indicator</Button>
                    <Button icon="fast-forward" size="md" variant="secondary" onClick={() => dispatch(latestMove())}>Toggle Move Indicator</Button>
                </>
            }
        </PanelWrapper>
    )
}

ControlPanel.defaultProps = {
    showSquareMarkings: true,
    showLegalMoves: true,
    showStepButtons: true
}

export default ControlPanel
