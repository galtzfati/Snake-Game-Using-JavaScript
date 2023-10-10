import {Position} from "./Position.js";
import {Entity} from "./Entity.js";
class Board {
    #height;
    #width;
    #board;
    #freePositions;

    constructor(height, width) {
        this.#height = height;
        this.#width = width;
        this.init();
    }
    get height() {
        return this.#height;
    }
    get width() {
        return this.#width;
    }
    get freePositions() {
        return this.#freePositions;
    }
    init() {
        this.#board = [];
        this.#freePositions = [];
        for (let i = 0; i < this.#height; i++) {
            const boardRow = [];
            for (let j = 0; j < this.#width; j++) {
                boardRow.push(Entity.BLANK);
                this.#freePositions.push(new Position(i, j));
            }
            this.#board.push(boardRow);
        }
    }
    insert(newPosition, entity) {
        this.#board[newPosition.x][newPosition.y] = entity;
        if (entity != Entity.BLANK) {
            let index = this.#freePositions.findIndex(position => position.x == newPosition.x && position.y == newPosition.y);
            this.#freePositions.splice(index, 1);
        }
        else {
            this.#freePositions.push(new Position(newPosition.x, newPosition.y));
        }
    }
    getRandomalFreePosition(previousPosition) {
        let randomFreePositionIndex = Math.floor(Math.random() * this.#freePositions.length);
        let randomPosition = this.#freePositions[randomFreePositionIndex];
        this.#freePositions.splice(randomFreePositionIndex, 1);
        if (previousPosition != null) {
            this.#freePositions.push(previousPosition);
        }
        return randomPosition;
    }
    inBounds(position) {
        return position.x >= 0 && position.x <this.#width && position.y >= 0 && position.y < this.#height;
    }
    inTunnel(position) {
        return this.#board[position.x][position.y] == Entity.TUNNEL;
    }
}
export {Board};