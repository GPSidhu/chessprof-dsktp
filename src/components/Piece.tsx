import { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { CSSProperties } from 'styled-components'
import { PieceType, Square } from 'chess.js'
import { PIECE_ICON_MAP, VIEW } from '../constants'
import { onPieceMove } from '../redux/actions'
import { BoardState } from './types'
import SquareIndicator from './SquareIndicator'
import { convertNToRowCol, convertGridRowColToSquare } from '../utils'

interface PieceProps {
    pos: Square
    type: PieceType
    color: "b" | "w"
    view: VIEW
    size: number
    x: number
    y: number
    selected?: boolean | null
    interaction?: boolean
    showSquareNumber?: boolean
    pieceClicked?(pos: string): void
    canMove(to: Square, from: Square): boolean
}

const PieceIcon = styled.img`
    cursor: pointer;
}`

const Piece = (props: PieceProps) => {
    const dispatch = useDispatch();
    const { type, color, size, x, y, pos, selected } = props;
    const [gridPos, setGridPos] = useState<{ x: number, y: number } | null>(null)
    const [rel, setRel] = useState<{ x: number, y: number } | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const boardSize = useSelector<BoardState, BoardState["boardSize"]>((state) => state.boardSize);

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            if (!isDragging) return;
            const elem = imgRef.current;
            if (elem && elem.offsetParent && rel) {
                let boardRect = elem.offsetParent.getBoundingClientRect();
                let newX = e.clientX - rel.x - boardRect.left;
                let newY = e.clientY - rel.y - boardRect.top;
                const upperLimit = boardSize - boardSize / 16;
                const lowerLimit = -boardSize / 16;
                setGridPos({
                    x: Math.max(Math.min(newX, upperLimit), lowerLimit),
                    y: Math.max(Math.min(newY, upperLimit), lowerLimit)
                })
            }
            e.stopPropagation()
            e.preventDefault()
        }

        function onMouseUp(e: MouseEvent) {
            setIsDragging(false)
            const elem = imgRef.current;
            if (elem && elem.offsetParent && rel) {
                let boardRect = elem.offsetParent.getBoundingClientRect();
                const currentPos = {
                    x: e.clientX - rel.x - boardRect.left,
                    y: e.clientY - rel.y - boardRect.top,
                    type: props.type,
                    color: props.color
                }
                const rank = convertNToRowCol(currentPos.y, boardSize); //row - 0 based
                const file = convertNToRowCol(currentPos.x, boardSize); // col - 0 based
                const sq = convertGridRowColToSquare(rank, file, props.view);
                if (props.canMove(sq, props.pos)) {
                    dispatch(onPieceMove({ from: props.pos, to: sq, type: props.type, color: props.color }))
                } else {
                    setGridPos({
                        x: props.x,
                        y: props.y
                    })
                }
            }
            e.stopPropagation()
            e.preventDefault()
        }
        if (isDragging) {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        }
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
    }, [isDragging, rel, dispatch, boardSize, props]);

    const onMouseDown = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (e.button !== 0) return;
        const elem = imgRef.current;
        if (elem) {
            let elemPos = elem.getBoundingClientRect();
            setIsDragging(true)
            setRel({
                x: e.pageX - elemPos.left,
                y: e.pageY - elemPos.top
            })
        }
        e.stopPropagation()
        e.preventDefault()
    }

    const onPieceClicked = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (props.pieceClicked)
            props.pieceClicked(pos);
    }

    const renderDragIndicator = () => {
        if (!isDragging || !gridPos)
            return null

        return (<SquareIndicator
            type="hover"
            x={convertNToRowCol(gridPos.x, boardSize) * boardSize / 8}
            y={convertNToRowCol(gridPos.y, boardSize) * boardSize / 8}
            size={boardSize / 8}
        />
        )
    }

    const style: CSSProperties = {
        position: 'absolute',
        width: (selected ? size + 2 : size) + 'px', //workaround for extra gap visible on selection
        height: (selected ? size + 2 : size) + 'px',
        left: (gridPos ? gridPos.x : x) + 'px',
        top: (gridPos ? gridPos.y : y) + 'px',
        marginTop: (selected ? -1 : 0) + 'px',
        borderRadius: (selected ? '3px' : 0),
        zIndex: selected ? 9 : 3
    }
    return (
        <>
            <PieceIcon src={PIECE_ICON_MAP[color === 'w' ? type.toUpperCase() : type]}
                ref={imgRef}
                alt={`${color}${type}`}
                style={style}
                onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => onPieceClicked(event)}
                onMouseDown={(e) => onMouseDown(e)} />
            {props.showSquareNumber && <span style={{
                position: 'absolute',
                left: (gridPos ? gridPos.x + boardSize / 8 - 8 : x + boardSize / 8 - 18) + 'px',
                top: (gridPos ? gridPos.y - 3 : y - 3) + 'px',
            }}>{pos}</span>
            }
            {isDragging && renderDragIndicator()}
        </>
    )
}

Piece.defaultProps = {
    interaction: false,
    showSquareNumber: false
}

export default Piece
