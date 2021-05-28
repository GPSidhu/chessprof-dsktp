import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// redux
import { useDispatch } from 'react-redux';
import {
    onPieceMove,
    resetBoard,
    undoMove,
    firstMove,
    latestMove,
    nextMove,
    previousMove,
    setMoveOptions
} from '../../redux/actions'

// third party
import { Square } from 'chess.js';

// src
import { Opening } from '../types';
import MoveTracker from './MoveTracker';
import Chessboard from '../Chessboard/Chessboard';
import List from '../List';
import { VIEW } from '../../constants';

interface Props {
    opening: Opening
}

const OpeningTitle = styled.h1`
    color: #ebe9e6;
    margin: 1rem;
`

const LayoutContainer = styled.div`
    margin: 1rem auto;
    display: flex;
    flex-direction: row;
    flex-wrap; wrap;
    justify-content: center;
    align-items: flex-start;
`

const BoardContainer = styled.div`
    max-width: 684px;
    width: 100%;
    min-width: 0;
`

const MoveLogArea = styled.div`
    position: relative;
    width: 300px;
    height: 100%;
    border: 2px solid #878686;
    border-radius: 4px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    margin-left: 1rem;
`
const MoveHistory = styled.div`
   width: 100%;
   height: auto;
   padding: 8px;
   filter: ${(props: { blur: boolean }) => props.blur ? 'blur(2px)' : 'none'};
`

const MoveSpan = styled.span`
    display: inline-block;
    color: #fff;
    font-weight: bold;
    width: 50px;
    margin: 4px;
    margin-right: 12px;
	padding: 2px;
`;

const Popup = styled.div`
    position: absolute;
    top: 16px;
    padding: 8px;
    width: 90%;
    height: auto;
    background: white;
    color: #000;
    border-radius: 4px;
    border: 1px solid black;
`

const OpeningLayout = ({ opening }: Props) => {
    const dispatch = useDispatch();
    const { title } = opening;
    const [moves, setMoves] = useState<Array<string>>([]);
    const [isInputRequired, setIsInputRequired] = useState(false);
    const [showMessage, setShowMessage] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<{ from?: Square, to?: Square } | null>(null);
    const [moveTracker] = useState<MoveTracker>(new MoveTracker(opening.moves));
    const [moveIndex, setMoveIndex] = useState<number>(-1);


    useEffect(() => {
        const reset = () => {
            moveTracker.reset(); // sets current to head of dll
            setMoves([]);
            setMoveIndex(-1);
            setShowMessage('');
            setIsInputRequired(false);
        }
        return () => {
            dispatch(resetBoard())
            reset()
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // this will undo the previous move, if the board is showing the recent move
    const onPreviousMove = () => {
        if (moveIndex < 0 || isInputRequired) return;
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
        if (moveIndex < moves.length - 1 || isInputRequired) {
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
        }
        if (_nextMove && _nextMove.isConditional()) {
            const possibleMoves = _nextMove.getOptions();
            if (possibleMoves && possibleMoves.length > 0) {
                const options = possibleMoves.map((m) => m.move + '');
                // ask user for the input
                setIsInputRequired(true);
                //setInputMoveOptions([...options]);
                setShowMessage(_nextMove.getMessage());
                dispatch(setMoveOptions(options))
            }
        }
    }

    const clearInput = () => {
        setIsInputRequired(false);
        setMoveOptions([]);
        setSelectedOption(null);
        setShowMessage("");
        dispatch(setMoveOptions([]));
    }
    // on submission of use choice from the conditional move options
    const onMoveSubmit = (option: string) => {
        if (option) {
            let nextMove = moveTracker.nextMove(option);
            if (!nextMove) return;
            const movesPlayed = moveTracker.getPlayedMoves();
            setMoves(() => [...movesPlayed]);
            setMoveIndex(moveIndex + 1);
            clearInput()
            dispatch(onPieceMove({
                move: nextMove.move + '',
                type: 'san'
            }))
        } else {
            alert("Invalid move selected. Please select one of the options");
        }
    }

    const onMoveOptionSelected = (type: "from" | "to", square: Square, san: string) => {
        if (type === "from") {
            setSelectedOption({ from: square })
            return
        }
        if (type === "to" && selectedOption && selectedOption.from) {
            onMoveSubmit(san)
            return
        }
        alert("Please select a piece first before selecting the target position.");
    }

    const onFirstMove = () => {
        if (isInputRequired) return;
        setMoveIndex(-1)
        dispatch(firstMove())
    }

    const onLatestMove = () => {
        if (isInputRequired) return;
        setMoveIndex(moves.length - 1)
        dispatch(latestMove())
    }

    const renderHistory = () => {
        if (!moves || moves.length === 0) return;
        let listItems = [], i = 0;
        while (i < moves.length) {
            let item: { w: string, b?: string, id: string } = {
                id: i + moves[i] + moves[i + 1],
                w: moves[i]
            }
            if (moves[i + 1]) item['b'] = moves[i + 1];
            listItems.push(item);
            i = i + 2
        }
        return <List items={listItems} listStyle={"number"} alternateColor>
            {(item: { w: string, b?: string, id: string }) => (
                <>
                    <MoveSpan>{item.w}</MoveSpan>
                    {item.b &&
                        <MoveSpan>{item.b}</MoveSpan>}
                </>)
            }
        </List>
    }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <OpeningTitle>{title}</OpeningTitle>
            </div>
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
                            latest: () => onLatestMove(),
                            onMoveInput: (type, square, san) => onMoveOptionSelected(type, square, san)
                        }}
                    />
                </BoardContainer>
                <MoveLogArea>
                    <MoveHistory blur={!!showMessage}>
                        {renderHistory()}
                        {/* {moves &&
                            moves.map((move, index) =>
                                move[0] ? (
                                    <MoveSpan key={`move_${index}`}>{`${index + 1}. ${move[0]
                                        } ${move[1] ? move[1] : ""}`}</MoveSpan>
                                ) : null
                            )} */}
                    </MoveHistory>
                    {showMessage &&
                        <Popup>
                            {showMessage}
                        </Popup>
                    }
                    {/* <div>
                        {showMessage && <span>{showMessage}</span>}
                        {isInputRequired && (
                            <MoveInputArea>
                                {inputMoveOptions &&
                                    inputMoveOptions.map((option, idx) => (
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
                    </div> */}
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
