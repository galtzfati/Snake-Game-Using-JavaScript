import { Position } from "./Position.js";
import * as Settings from "./Settings.js";
import { Entity } from "./Entity.js";
import { Screen } from "./Screen.js";
class Snake {
    #poisitonsList;
    #board;
    #startingSize = 5;

    constructor(board) {
        this.#board = board;
    }
    get positionList() {
        return this.#poisitonsList;
    }
    get head() {
        return this.#poisitonsList[0];
    }
    init() {
        this.#poisitonsList = [];
        let x = Math.floor(this.#board.width / 2);
        let y = Math.floor(this.#board.height / 2);
        for (let i = 0; i < this.#startingSize; i++) {
            let position = new Position(x, y);
            this.#poisitonsList.push(position);
            this.#board.insert(position, Entity.SNAKE);
            x--;
        }
        this.#poisitonsList.forEach(position => Screen.paint(position, Settings.snakeColor));
    }
    move(newMovePosition) {
        let tail = this.#poisitonsList.pop();
        this.#poisitonsList.unshift(newMovePosition);
        Screen.erase(tail);
        this.#board.insert(tail, Entity.BLANK);
        Screen.paint(newMovePosition, Settings.snakeColor);
        this.#board.insert(newMovePosition, Entity.SNAKE);
    }
    isBitHimself(newPosition) {
        return this.#poisitonsList.some(position => Position.areEqual(newPosition, position));
    }
    grow(newPosition) {
        this.#poisitonsList.unshift(newPosition);
        Screen.paint(newPosition, Settings.snakeColor);
        this.#board.insert(newPosition, Entity.SNAKE);
    }
}
export {Snake};