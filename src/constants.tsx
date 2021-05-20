import icons from './assets/pieces/icons'

export enum VIEW { WHITE = 1, BLACK = 2 }

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

export const PIECE_MAP: {[key: string]: string} = {
    K: "wK", Q: "wQ", B: "wB", N: "wN", R: "wR", P: "wP",
    k: "bK", q: "bQ", b: "bB", n: "bN", r: "bR", p: "bP",
};

export const PIECE_ICON_MAP:  {[key:string]: string}  = {
    K: icons.wK, Q: icons.wQ, B: icons.wB, N: icons.wN, R: icons.wR, P: icons.wP,
    k: icons.bK, q: icons.bQ, b: icons.bB, n: icons.bN, r: icons.bR, p: icons.bP,
}