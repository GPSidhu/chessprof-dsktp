export type Action = {
	type: string;
	payload: any;
};

export const onPieceClick = (piecePos: string): Action => ({
    type: "PIECE_CLICKED",
    payload: piecePos
})

export const onPieceMove = (piecePos: string): Action => ({
    type: "PIECE_MOVED",
    payload: piecePos
})
