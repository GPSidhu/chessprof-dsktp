import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { Opening } from '../types';
import MoveTracker from './MoveTracker';
import Chessboard from '../Chessboard/Chessboard';
import { VIEW } from '../../constants';
import { onPieceMove, resetBoard, undoMove, firstMove, latestMove, nextMove, previousMove } from '../../redux/actions'
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
    grid-template-columns: 2fr auto;
    border: 3px dotted black;
`

const BoardContainer = styled.div`
    width: 100%;
    // height: 100%;
    // grid-area: board;
    border: 2px solid yellow;
    min-width: 0;
`

const MoveLogArea = styled.div`    
    width: 300px;
    height: 100%;
    // grid-area: log;
    border: 1px solid white;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`

// const ControlsArea = styled.div`
//     width: 100%;
//     height: 100%;
//     grid-area: controls;
//     border: 1px solid red;
//     display: inline-flex;
// 	flex-direction: row;
// 	justify-content: center;
// `
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
    const dispatch = useDispatch();
    // const state = useSelector<AppState, OpeningState>(state => state.openingState);
    const { title } = opening;
    const [moves, setMoves] = useState<Array<string>>([]);
    const [isInputRequired, setIsInputRequired] = useState(false);
    const [showMessage, setShowMessage] = useState<string>("");
    const [moveOptions, setMoveOptions] = useState<string[]>([]);
    const [moveTracker] = useState<MoveTracker>(new MoveTracker(opening.moves));
    const [moveIndex, setMoveIndex] = useState<number>(-1);

    useEffect(() => {
        return () => {
            dispatch(resetBoard())
        };
    }, [dispatch]);

    // this will undo the previous move, if the board is showing the recent move
    const onPreviousMove = () => {
        if (moveIndex < 0) return;
        if (moveIndex < moves.length - 1) { // not the latest move
            // only update the board fen
            setMoveIndex(moveIndex - 1);
            dispatch(previousMove())
        } else {
            // i.e. game board is not showing the last played move
            // so we cannot undo the previous move, simply track back to prev played move from
            moveTracker.previousMove();
            setMoveIndex(moveIndex - 1);
            const movesPlayedSoFar = moveTracker.getPlayedMoves();
            setMoves(() => [...movesPlayedSoFar]);
            dispatch(undoMove())
        }
    }

    // this will play the next move from object
    const onNextMove = () => {
        if (moveIndex < moves.length - 1) {
            setMoveIndex(moveIndex + 1);
            dispatch(nextMove())
            return;
        }
        let _nextMove = moveTracker.nextMove(null);
        if (!_nextMove) return null;
        if (_nextMove.move && !_nextMove.isConditional()) {
            const movesPlayed = moveTracker.getPlayedMoves();
            setMoves(() => [...movesPlayed]);
            setMoveIndex(moveIndex + 1);
            dispatch(onPieceMove({
                move: _nextMove.move,
                type: 'san'
            }))
            // return {
            //     move: nextMove.move + '',
            //     type: 'san'
            // } as NextMove;
        }
        if (_nextMove && _nextMove.isConditional()) {
            const possibleMoves = _nextMove.getOptions();
            if (possibleMoves && possibleMoves.length > 0) {
                const options = possibleMoves.map((m) => m.move + '');
                // ask user for the input
                setIsInputRequired(true);
                setMoveOptions([...options]);
                setShowMessage(_nextMove.getMessage());
            }
        }
    }

    // on submission of use choice from the conditional move options
    const onMoveSubmit = (option: string) => {
        if (option) {
            let nextMove = moveTracker.nextMove(option);
            if (!nextMove) return;
            const movesPlayed = moveTracker.getPlayedMoves();
            setMoves(() => [...movesPlayed]);
            setIsInputRequired(false);
            setMoveOptions([]);
            setShowMessage("");
        } else {
            alert("Invalid move selected. Please select one of the options");
        }
    }

    const onFirstMove = () => {
        setMoveIndex(-1)
        dispatch(firstMove())
    }

    const onLatestMove = () => {
        setMoveIndex(moves.length - 1)
        dispatch(latestMove())
    }

    return (
        <>
            <h1>{title}</h1>
            <LayoutContainer>
                <BoardContainer className="board">
                    <Chessboard
                        showPanel
                        // showResetButton
                        readOnly={true}
                        fen=''
                        pgn=''
                        view={VIEW.WHITE}
                        controlConfig={{
                            override: true,
                            next: () => onNextMove(),
                            prev: () => onPreviousMove(),
                            first: () => onFirstMove(),
                            latest: () => onLatestMove()
                        }}
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
                {/* <ControlsArea className="controls">
                    <button onClick={onPreviousMove}>{'<'}</button>
                    <button onClick={onNextMove}>{'>'}</button>
                </ControlsArea> */}
                {/* <span>{id}</span>
            <span>{title}</span> */}
            </LayoutContainer>
        </>
    )
}

export default OpeningLayout
