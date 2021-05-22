import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import Button from './Button'
import { rotateBoard, toggleMarkings, toggleMoveIndicator } from '../redux/actions'

const PanelWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 95%;
    width: 95%;
    border-radius: 4px;
    background: darkgrey;
    > * {
        margin: 8px;
    }
`
const ControlPanel = () => {
    const dispatch = useDispatch();
    return (
        <PanelWrapper>
            <Button size="md" variant="secondary" onClick={() => dispatch(rotateBoard())}>Rotate</Button>
            <Button size="md" variant="secondary" onClick={() => dispatch(toggleMarkings())}>Toggle Markings</Button>
            <Button size="md" variant="secondary" onClick={() => dispatch(toggleMoveIndicator())}>Toggle Move Indicator</Button>
        </PanelWrapper>
    )
}

export default ControlPanel
