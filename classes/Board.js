import {Position} from "./Position.js";
import {Entity} from "./Entity.js";
class Board {
    _height;
    _width;
    _board;
    _freePositions;

    constructor(height, width) {
        this._height = height;
        this._width = width;
        this.init();
    }
    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }
    get freePositions() {
        return this._freePositions;
    }
    init() {
        this._board = [];
        this._freePositions = [];
        for (let i = 0; i < this._height; i++) {
            const boardRow = [];
            for (let j = 0; j < this._width; j++) {
                boardRow.push(Entity.BLANK);
                this._freePositions.push(new Position(i, j));
            }
            this._board.push(boardRow);
        }
    }
    insert(newPosition, entity) {
        this._board[newPosition.x][newPosition.y] = entity;
        if (entity != Entity.BLANK) {
            let index = this._freePositions.findIndex(position => position.x == newPosition.x && position.y == newPosition.y);
            this._freePositions.splice(index, 1);
        }
        else {
            this._freePositions.push(new Position(newPosition.x, newPosition.y));
        }
    }
    getRandomalFreePosition(previousPosition) {
        let randomFreePositionIndex = Math.floor(Math.random() * this._freePositions.length);
        let randomPosition = this._freePositions[randomFreePositionIndex];
        this._freePositions.splice(randomFreePositionIndex, 1);
        if (previousPosition != null) {
            this._freePositions.push(previousPosition);
        }
        return randomPosition;
    }
    inBounds(position) {
        return position.x >= 0 && position.x <this._width && position.y >= 0 && position.y < this._height;
    }
    inTunnel(position) {
        return this._board[position.x][position.y] == Entity.TUNNEL;
    }
}
export {Board};