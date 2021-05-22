export interface BoardSquare {
    x: number       // left in px
    y: number       // top in px
    row?: number     // 0 to 7 in board[][]
    col?: number     // 0 to 7 in board[][]
    name?: string    // "e4", "g2", ...
    file?: string    // "a", "b", "c", "d", "e", "f", "g", "h"
    rank?: number    // 1 to 8
}
