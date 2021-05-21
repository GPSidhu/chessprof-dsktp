import { useRef, useEffect, useState } from 'react'
import styled, { CSSProperties } from 'styled-components'
import { PieceType } from 'chess.js'
import { PIECE_ICON_MAP } from '../constants'

interface PieceProps {
    pos: string
    type: PieceType,
    color?: "b" | "w"
    size: number
    x: number
    y: number
    selected?: boolean | null
    interaction?: boolean
    pieceClicked?(pos: string): void
}

const PieceIcon = styled.img`
    cursor: pointer;
`

const Piece = (props: PieceProps) => {
    const { type, color, size, x, y, pos, selected } = props;
    const [gridPos, setGridPos] = useState<{ x: number, y: number } | null>(null)
    const [rel, setRel] = useState<{ x: number, y: number } | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const imgRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            if (!isDragging) return;
            const elem = imgRef.current;
            if (elem && elem.offsetParent && rel) {
                let elemPos = elem.offsetParent.getBoundingClientRect();
                let x1 = e.clientX - rel.x - elemPos.left
                let y2 = e.clientY - rel.y - elemPos.top
                setGridPos({
                    x: e.clientX - rel.x - elemPos.left,
                    y: e.clientY - rel.y - elemPos.top
                })
                console.log("pos => " + pos + "(x: " + x1 + ", y: " + y2 + ")")
            }
            e.stopPropagation()
            e.preventDefault()
        }

        function onMouseUp(e: MouseEvent) {
            setIsDragging(false)
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
    }, [isDragging, rel, pos]);

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
        // alert("onPieceClicked: " + props.pos)
        if (props.pieceClicked)
            props.pieceClicked(pos);
    }
    const style: CSSProperties = {
        position: 'absolute',
        width: (selected ? size + 2 : size) + 'px', //workaround for extra gap visible on selection
        height: (selected ? size + 2 : size) + 'px',
        left: (gridPos ? gridPos.x : x) + 'px',
        top: (gridPos ? gridPos.y : y) + 'px',
        marginTop: (selected ? -1 : 0) + 'px',
        backgroundColor: selected ? 'yellow' : 'transparent',
        borderRadius: (selected ? '3px' : 0)
    }
    return (
        <>
            <PieceIcon src={PIECE_ICON_MAP[color === 'w' ? type.toUpperCase() : type]}
                ref={imgRef}
                alt={`${color}${type}`}
                style={style}
                onClick={(event: React.MouseEvent<HTMLImageElement, MouseEvent>) => onPieceClicked(event)}
                onMouseDown={(e) => onMouseDown(e)} />
            <span style={{
                position: 'absolute',
                left: (gridPos ? gridPos.x : x) + 'px',
                top: (gridPos ? gridPos.y : y) + 'px',
            }}>{pos}</span>
        </>
    )
}

Piece.defaultProps = {
    interaction: false
}

export default Piece
