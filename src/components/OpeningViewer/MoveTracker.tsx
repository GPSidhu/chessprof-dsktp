import { ConditionalMove } from '../types'

const WHITE_TURN = "w";
const BLACK_TURN = "b";

export class Node {
    move?: string | null | undefined
    prev?: Node | null | undefined
    next?: Node | null | undefined
    turn: "w" | "b"
    conditionalMove?: { options: Node[], msg: string } | null

    constructor(turn: "w" | "b", move?: string, prev?: Node | null, next?: Node | null, conditionalMove?: { options: Node[], msg: string } | null) {
        this.move = move;
        this.prev = prev || null;
        this.next = next || null;
        this.turn = turn || '';
        this.conditionalMove = conditionalMove
    }
    getNextMove() {
        return this.next;
    }
    getPrevMove() {
        return this.prev;
    }
    getMove() {
        return this.move;
    }
    getMessage() {
        if (this.conditionalMove)
            return this.conditionalMove.msg || '';

        return ''
    }
    getOptions() {
        if (this.conditionalMove) return this.conditionalMove.options
        return []
    }
    isConditional() {
        return !this.move && this.conditionalMove && 'options' in this.conditionalMove
    }
}

// @strictPropertyInitialization: false
class MoveTracker {
    allMoves: Array<Array<string | ConditionalMove>>
    head: Node | undefined
    history: Array<Array<string>>
    current: Node | null | undefined
    turn: "w" | "b"

    constructor(moves: Array<Array<string | ConditionalMove>> = []) {
        this.allMoves = JSON.parse(JSON.stringify(moves)) || [];
        this.head = this.generateDLL(moves) || undefined;
        this.turn = "w";
        this.history = [];
        this.current = undefined;
    }

    // generate doubly linked list for the input array of moves
    generateDLL(moves: Array<Array<string | ConditionalMove>>): Node | undefined {
        let head: Node | undefined = undefined;
        let prev: Node | undefined = undefined;
        moves && moves.forEach((pair) => {
            pair && pair.length !== 0 && pair.forEach((move, turn) => {
                if (move) {
                    let node = this.addNode(move, turn % 2 === 0 ? WHITE_TURN : BLACK_TURN);
                    if (prev) prev.next = node;
                    if (node) node.prev = prev;
                    prev = node;
                    if (!head) head = node;
                }
            })
        })
        return head;
    }

    // add a node in the dll for a given move "string" | "conditional"
    addNode(move: any, turn: "w" | "b"): Node | undefined {
        if (!move)
            return move;

        if (typeof move !== 'string' && 'options' in move)
            return this.addNodeConditional(move, turn)

        let node = new Node(turn, move);
        return node;
    }

    // add a node in the dll for a given conditional move
    addNodeConditional(moveObj: ConditionalMove, turn: "w" | "b") {
        let node: Node = new Node(turn);
        let options = []
        if (moveObj && moveObj.options) {
            options = Object.keys(moveObj.options).map((move) => {
                let optionNode = new Node(turn, move, node, null);
                optionNode.next = this.generateDLL(moveObj.options[move]);
                if (optionNode.next) optionNode.next.prev = optionNode;
                return optionNode;
            })
            node.conditionalMove = {
                options: options,
                msg: moveObj.msg || ''
            };
        }
        return node;
    }

    // toggles the turn 
    updateTurn() {
        this.turn = this.turn === "w" ? "b" : "w";
    }

    // adds played move in the history[[]]
    logMove(move: string | null) {
        if (!move || !this.history || typeof move !== "string")
            return this.history;

        if (
            this.history.length === 0 ||
            this.history[this.history.length - 1].length === 2
        ) {
            // this is white's move
            let newMove = [];
            newMove.push(move);
            this.history.push(newMove);
            return this.history;
        }

        if (this.history[this.history.length - 1].length === 1) {
            // this is black's move
            this.history[this.history.length - 1].push(move);
            return this.history;
        }
    }

    // returns the flattened array of moves in the history[[]]
    getPlayedMoves() {
        if (this.history && this.history.length > 0) {
            let playedMoves: string[] = [];
            this.history.forEach((pair) => {
                playedMoves.push(...pair)
            })
            return playedMoves;
        }
        return [];
    }

    // this will undo the last played move
    previousMove() {
        // before head of list
        if (!this.current || this.history.length === 0)
            return null;

        let thisMove;
        // case 1: current turn is of white i.e. black played last move
        if (this.turn === "w") {
            thisMove = this.history[this.history.length - 1].pop();
        }

        // case 1: current turn is of black i.e. white played last move
        if (this.turn === "b") {
            thisMove = this.history[this.history.length - 1].pop();
            this.history.pop();
        }
        // update current pointer
        const prevMove = this.current.getPrevMove();
        this.current = prevMove;
        if (prevMove && prevMove.isConditional())
            this.current = prevMove.getPrevMove();

        this.updateTurn();
        return thisMove;
    }

    // plays next move, increment current pointer, returns played move
    nextMove(playedMove: string | null | undefined) {

        // first node, current is not yet initialized
        if (!this.current) {
            this.current = this.head;
            if (this.current && this.current.move) {
                this.logMove(this.current.move);
                this.updateTurn();
            }
            return this.current;
        }

        if (!this.current.isConditional()) {
            const nextMove = this.current.getNextMove();
            if (!nextMove) //reached tail
                return null;

            this.current = nextMove;
            if (nextMove.move && !nextMove.isConditional()) {
                this.logMove(nextMove.move);
                this.updateTurn();
            }
            return nextMove;
        }

        if (playedMove && this.current.isConditional()) {
            this.logMove(playedMove);
            this.updateTurn();
            const move = this.current.getOptions().find((m) => m.move === playedMove)
            this.current = move;
            return move
        }

        // conditional move
        return this.current;
    }

    getLatestMove() {
        return this.current;
    }

    getFirstMove() {
        return this.head;
    }

    reset() {
        this.current = this.head;
        return this.current;
    }
}

export default MoveTracker
