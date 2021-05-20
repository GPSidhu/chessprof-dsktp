import { PieceType } from 'chess.js'
import { PIECE_ICON_MAP } from '../constants'

interface Props {
    pos: string,
    type: PieceType,
    color?: "b" | "w",
    size: number,
    x: number,
    y: number,
    selected?: boolean | null
    canMove?: boolean
}

const Piece = (props: Props) => {
    const { type, color, size, x, y } = props;
    return (
        <img src={PIECE_ICON_MAP[color === 'w' ? type.toUpperCase(): type]}
            alt={`${color}${type}`}
            style={{ position: 'absolute',
            width: size + 'px',
            height: size + 'px',
            left: x + 'px',
            top: y + 'px' }} />
    )
}

Piece.defaultProps = {
    canMove: true
}

export default Piece
