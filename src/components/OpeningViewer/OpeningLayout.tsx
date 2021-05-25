import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { AppState, NextMove, Opening, OpeningState } from '../types';
import MoveTracker, { Node } from './MoveTracker';
import Chessboard from '../Chessboard';
import { VIEW } from '../../constants';

interface Props {
    opening: Opening
}

const LayoutContainer = styled.div`
    margin: 3rem auto;
    max-width: 884px;
    max-height: 900px;
    justify-content: center;
    align-items: center;
    display: grid;
    grid-template-areas: 
        'board log'
        'controls log';
    border: 3px dotted black;
`

const BoardContainer = styled.div`
    width: 100%;
    // height: 100%;
    grid-area: board;
    border: 2px solid yellow;
    min-width: 0;
`

const MoveLogArea = styled.div`    
    width: 300px;
    height: 100%;
    grid-area: log;
    border: 1px solid white;
`

const ControlsArea = styled.div`
    width: 100%;
    height: 100%;
    grid-area: controls;
    border: 1px solid red;
    display: inline-flex;
	flex-direction: row;
	justify-content: center;
`


const MoveSpan = styled.span`
	background-color: #fff;
	color: #000;
	border: 1px dashed grey;
	margin: 4px;
	padding: 2px;
`;

const MoveInputArea = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	min-height: 100px;
	width: 100%;
	padding: 12px;
`;

const MoveInput = styled.button`
	background-color: lightgrey;
	color: #000;
	border: 1px solid grey;
	margin: 4px;
	padding: 2px;
	height: 24px;
	cursor: pointer;
`;

const OpeningLayout = ({ opening }: Props) => {
    // const state = useSelector<AppState, OpeningState>(state => state.openingState);
    const { id, title } = opening;
    const [moves, setMoves] = useState<Array<Array<string>>>([]);
    const [isInputRequired, setIsInputRequired] = useState(false);
    const [showMessage, setShowMessage] = useState<string>("");
    const [moveOptions, setMoveOptions] = useState<string[]>([]);
    const [moveTracker] = useState<MoveTracker>(new MoveTracker(opening.moves));
    const onPreviousMove = () => {
        moveTracker.previousMove();
        const movesPlayedSoFar = moveTracker.getPlayedMoves();
        setMoves(() => [...movesPlayedSoFar]);
    }
    const onNextMove = () => {
        // console.log(moves);
        let nextMove = moveTracker.nextMove(null);
        if (!nextMove) return null;
        if (nextMove.move && !nextMove.isConditional()) {
            const movesPlayed = moveTracker.getPlayedMoves();
            setMoves(() => [...movesPlayed]);
            return {
                move: nextMove + '',
                type: 'san'
            } as NextMove;
        }
        if (nextMove && nextMove.isConditional()) {
            const possibleMoves = nextMove.getOptions();
            if (possibleMoves && possibleMoves.length > 0) {
                const options = possibleMoves.map((m) => m.move + '');
                // ask user for the input
                setIsInputRequired(true);
                setMoveOptions([...options]);
                setShowMessage(nextMove.getMessage());
            }
        }
        return null
    }
    const onMoveSubmit = (option: string) => {
        if (option) {
            let nextMove = moveTracker.nextMove(option);
            if (!nextMove) return;
            const movesPlayed = moveTracker.getPlayedMoves();
            setMoves(() => [...movesPlayed]);
            setIsInputRequired(true);
            setMoveOptions([]);
            setShowMessage("");
        } else {
            alert("Invalid move selected. Please select one of the options");
        }
    }
    return (
        <>
            <h1>{title}</h1>
            <LayoutContainer>
                <BoardContainer className="board">
                    <Chessboard
                        showPanel={true}
                        readOnly={false}
                        fen=''
                        pgn=''
                        view={VIEW.WHITE}
                        next={() => onNextMove()}
                    />
                </BoardContainer>
                <MoveLogArea className="logs">
                    <div>
                        {moves &&
                            moves.map((move, index) =>
                                move[0] ? (
                                    <MoveSpan key={`move_${index}`}>{`${index + 1}. ${move[0]
                                        } ${move[1] ? move[1] : ""}`}</MoveSpan>
                                ) : null
                            )}
                    </div>
                    <div>
                        {showMessage && <span>{showMessage}</span>}
                        {isInputRequired && (
                            <MoveInputArea>
                                {moveOptions &&
                                    moveOptions.map((option, idx) => (
                                        <MoveInput
                                            key={`mi_${idx}`}
                                            type="submit"
                                            onClick={() => onMoveSubmit(option)}
                                        >
                                            {option}
                                        </MoveInput>
                                    ))}
                            </MoveInputArea>
                        )}
                    </div>
                </MoveLogArea>
                <ControlsArea className="controls">
                    <button onClick={onPreviousMove}>{'<'}</button>
                    <button onClick={onNextMove}>{'>'}</button>
                </ControlsArea>
                {/* <span>{id}</span>
            <span>{title}</span> */}
            </LayoutContainer>
        </>
    )
}

export default OpeningLayout
