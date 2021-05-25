import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Button from '../Button'
import { firstMove, latestMove, nextMove, previousMove, resetBoard, rotateBoard, toggleMarkings, toggleMoveIndicator } from '../../redux/actions'
import { PanelOverrides } from '../types'

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
const ControlPanel = ({ showLegalMoves, showSquareMarkings, showStepButtons, showResetButton, config}: Props) => {
    const dispatch = useDispatch();
    // const boardState = useSelector<AppState, BoardState>((state) => state.boardState);
    const defaultNext = () => dispatch(nextMove())
    const defaultPrev = () => dispatch(previousMove())
    
    return (
        <PanelWrapper>
            <Button icon="rotate" size="md" variant="secondary" onClick={() => dispatch(rotateBoard())} />
            {showSquareMarkings && <Button icon="marker" size="md" variant="secondary" onClick={() => dispatch(toggleMarkings())}>Toggle Markings</Button>}
            {showLegalMoves && <Button icon="validate" size="md" variant="secondary" onClick={() => dispatch(toggleMoveIndicator())}>Toggle Move Indicator</Button>}
            {showResetButton && <Button icon="reset" size="md" variant="secondary" onClick={() => dispatch(resetBoard())}>Reset</Button>}
            {showStepButtons &&
                <>
                    <Button icon="fast-backward" size="md" variant="secondary" onClick={() => config?.override ? config.first() : dispatch(firstMove())}>First move</Button>
                    <Button icon="backward" size="md" variant="secondary" onClick={() => config?.override ? config.prev() : defaultPrev()}>Previous move</Button>
                    <Button icon="forward" size="md" variant="secondary" onClick={() => config?.override ? config.next() : defaultNext()}>Next Move</Button>
                    <Button icon="fast-forward" size="md" variant="secondary" onClick={() => config?.override ? config.latest() : dispatch(latestMove())}>Latest Move</Button>
                </>
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
