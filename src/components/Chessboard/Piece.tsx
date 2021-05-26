import { useRef, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled, { CSSProperties } from 'styled-components'
import { PieceType, Square } from 'chess.js'
import { PIECE_ICON_MAP, VIEW } from '../../constants'
import { onPieceMove } from '../../redux/actions'
import SquareIndicator from './SquareIndicator'
import { convertNToRowCol, convertGridRowColToSquare } from '../../utils'

interface PieceProps {
    pos: Square
    type: PieceType
    color: "b" | "w"
    view: VIEW
    x: number
    y: number
    selected?: boolean | null
    readOnly?: boolean
    showSquareNumber?: boolean
    pieceClicked?(pos: string): void
    canMove(to: Square, from: Square): boolean
}

const PieceIcon = styled.img`
    cursor: pointer;
}`

const Marking = styled.span`
    position: absolute;
    font-weight: bold;
    font-size: 14px;

    @media screen and (max-width: 980px) {
        font-size: 8px;
    }
    @media screen and (max-width: 724px) {
        font-size: 4px;
    }
`
const Piece = (props: PieceProps) => {
    const dispatch = useDispatch();
    const { type, color, x, y, pos, selected } = props;
    const [gridPos, setGridPos] = useState<{ x: number, y: number } | null>(null) // x,y in %
    const [rel, setRel] = useState<{ x: number, y: number } | null>(null) // relative pos in px
    const [isDragging, setIsDragging] = useState(false)
    const imgRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            if (!isDragging || props.readOnly) return;
            const elem = imgRef.current;
            if (elem && elem.offsetParent && rel) {
                let boardRect = elem.offsetParent.getBoundingClientRect();
                let newX = e.clientX - rel.x - boardRect.left; // in px
                let newY = e.clientY - rel.y - boardRect.top; // in px
                const upperLimit = boardRect.width - boardRect.width / 16;
                const lowerLimit = -boardRect.width / 16;
                setGridPos({
                    x: (Math.max(Math.min(newX, upperLimit), lowerLimit) * 100) / boardRect.width, // in %
                    y: (Math.max(Math.min(newY, upperLimit), lowerLimit) * 100) / boardRect.height // in %
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
                    x: e.clientX - rel.x - boardRect.left, //in px
                    y: e.clientY - rel.y - boardRect.top, //in px
                    type: props.type,
                    color: props.color
                }
                const rank = convertNToRowCol(currentPos.y * 100 / boardRect.width); //row - 0 based
                const file = convertNToRowCol(currentPos.x * 100 / boardRect.width); // col - 0 based
                const sq = convertGridRowColToSquare(rank, file, props.view);
                if (props.canMove(sq, props.pos)) {
                    dispatch(onPieceMove({
                        from: props.pos,
                        to: sq,
                        type: props.type,
                        color: props.color
                    }))
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
    }, [isDragging, rel, dispatch, props]);

    useEffect(() => {
        return () => {
            setGridPos(null)
        };
    }, [props.view]);

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
            type="selection"
            x={convertNToRowCol(gridPos.x)}
            y={convertNToRowCol(gridPos.y)}
        />
        )
    }

    const style: CSSProperties = {
        position: 'absolute',
        width: 100 / 8 + '%',
        left: (gridPos ? gridPos.x : x) + '%',
        top: (gridPos ? gridPos.y : y) + '%',
        marginTop: (selected ? -1 : 0) + 'px',
        borderRadius: (selected ? '3px' : 0),
        zIndex: isDragging ? 5 : 3
    }
    return (
        <>
            <PieceIcon src={PIECE_ICON_MAP[color === 'w' ? type.toUpperCase() : type]}
                ref={imgRef}
                alt={`${color}${type}`}
                style={style}
                onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => onPieceClicked(event)}
                onMouseDown={(e) => !props.readOnly && onMouseDown(e)}
            />
            {props.showSquareNumber &&
                <Marking style={{
                    left: (gridPos ? gridPos.x + 100 / 10: x+ 100 / 10) + '%',
                    top: (gridPos ? gridPos.y : y) + '%',
                    zIndex: isDragging ? 5 : 3
                }}>{pos}</Marking>
            }
            {isDragging && renderDragIndicator()}
        </>
    )
}

Piece.defaultProps = {
    readOnly: false,
    showSquareNumber: false
}

export default Piece
