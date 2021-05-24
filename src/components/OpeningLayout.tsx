import React from 'react'
import { useSelector } from 'react-redux';
import { AppState, Opening, OpeningState } from './types';

interface Props {
    opening: Opening
}

const OpeningLayout = ({opening}: Props) => {
    // const state = useSelector<AppState, OpeningState>(state => state.openingState);
    const {id, title} = opening;
    debugger
    return (
        <div>
            <span>{id}</span>
            <span>{title}</span>
        </div>
    )
}

export default OpeningLayout
