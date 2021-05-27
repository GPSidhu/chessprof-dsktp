// third party
import { Square, PieceType } from 'chess.js';

// src
import { BoardSquare, BoardState } from './components/types';
import { VIEW, FILES } from './constants'

// converts a relative grid position in px into 8x8 board's column/row
export function convertNToRowCol(n: number) {
    const squareSize = 100 / 8;
    let col = Math.floor((n + squareSize / 2) / squareSize)
    return Math.min(col, 7)
}

// converts row/col of state.board[][] into 8x8 board's column/row based on view = WHITE | BLACK
export function convertRowColToSquare(row: number, col: number, view: VIEW): { pos: Square, col: number, row: number } {
    if (view === VIEW.WHITE) {
        return {
            pos: `${FILES[col]}${8 - row}` as Square,
            col: col,
            row: row
        }
    }
    return {
        pos: `${FILES[col]}${8 - row}` as Square,
        col: 8 - col - 1,
        row: 8 - row - 1
    }
}

// converts row/col of 8x8 grid to  column/row based on view = WHITE | BLACK
export function convertGridRowColToSquare(row: number, col: number, view: VIEW): Square {
    if (view === VIEW.WHITE) {
        return `${FILES[col]}${8 - row}` as Square
    }
    return `${FILES[8 - col - 1]}${row + 1}` as Square;
}

// converts a sqaure position "e4" to an object of type <Square>
export function convertPosToSquare(piecePos: string, view: VIEW): BoardSquare | null {
    const boardSize = 100;
    if (!piecePos) return null
    let sq: BoardSquare = { x: 0, y: 0, col: 0, row: 0 };
    let file = piecePos.split('')[0];
    let rank = parseInt(piecePos.split('')[1]);
    let col = FILES.findIndex((f) => f === file);
    let row = 8 - rank;
    if (view === VIEW.BLACK) {
        col = 8 - col - 1;
        row = rank - 1
    }
    sq = {
        file: file,
        rank: rank,
        row: row,
        col: col,
        x: col * boardSize / 8,
        y: row * boardSize / 8,
        name: piecePos
    };
    return sq;
}

// check if the moved piece is a pawn promotion or not
export function isPromotion(type: PieceType, color: "b" | "w", to: Square) {
	const rank = to.split("")[1];
	if (type.toLowerCase() === "p")
		return (
			(color === "b" && rank === "1") || (color === "w" && rank === "8")
		);
	return false;
}

// checks if the move being played is on the board state in historical position
// i.e. return true if it is the latest move else false
export function isNewMove(state: BoardState) {
    const {current, history} = state;
    return (current === history.length - 1)
}
