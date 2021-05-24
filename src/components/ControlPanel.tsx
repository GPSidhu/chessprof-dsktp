import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Button from './Button'
import { rotateBoard, toggleMarkings, toggleMoveIndicator } from '../redux/actions'

interface Props {
    showSquareMarkings?: boolean
    showLegalMoves?: boolean
}

const PanelWrapper = styled.div`
    display: flex;
    flex-direction: column;
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
const ControlPanel = ({showLegalMoves, showSquareMarkings}: Props) => {
    const dispatch = useDispatch();
    return (
        <PanelWrapper>
            <Button icon="rotate" size="sm" variant="secondary" onClick={() => dispatch(rotateBoard())} />
            {showSquareMarkings && <Button icon="marker" size="sm" variant="secondary" onClick={() => dispatch(toggleMarkings())}>Toggle Markings</Button>}
            {showLegalMoves && <Button icon="validate" size="sm" variant="secondary" onClick={() => dispatch(toggleMoveIndicator())}>Toggle Move Indicator</Button>}
        </PanelWrapper>
    )
}

ControlPanel.defaultProps = {
    showSquareMarkings: true,
    showLegalMoves: true
}

export default ControlPanel
