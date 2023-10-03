import { Position } from "./Position.js";
import * as Settings from "./Settings.js";
import { Entity } from "./Entity.js";
import { Screen } from "./Screen.js";
class Snake {
    _poisitonsList;
    _board;
    _startingSize = 5;

    constructor(board) {
        this._board = board;
    }
    get positionList() {
        return this._poisitonsList;
    }
    get head() {
        return this._poisitonsList[0];
    }
    init() {
        this._poisitonsList = [];
        let x = Math.floor(this._board.width / 2);
        let y = Math.floor(this._board.height / 2);
        for (let i = 0; i < this._startingSize; i++) {
            let position = new Position(x, y);
            this._poisitonsList.push(position);
            this._board.insert(position, Entity.SNAKE);
            x--;
        }
        this._poisitonsList.forEach(position => Screen.paint(position, Settings.snakeColor));
    }
    move(newMovePosition) {
        let tail = this._poisitonsList.pop();
        this._poisitonsList.unshift(newMovePosition);
        Screen.erase(tail);
        this._board.insert(tail, Entity.BLANK);
        Screen.paint(newMovePosition, Settings.snakeColor);
        this._board.insert(newMovePosition, Entity.SNAKE);
    }
    isBitHimself(newPosition) {
        return this._poisitonsList.some(position => Position.areEqual(newPosition, position));
    }
    grow(newPosition) {
        this._poisitonsList.unshift(newPosition);
        Screen.paint(newPosition, Settings.snakeColor);
        this._board.insert(newPosition, Entity.SNAKE);
    }
}
export {Snake};