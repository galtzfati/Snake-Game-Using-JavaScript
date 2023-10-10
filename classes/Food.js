import { Entity } from "./Entity.js";
import { Screen } from "./Screen.js";
import * as Settings from "./Settings.js";
class Food {
    #position;
    #board;

    constructor(board) {
        this.#board = board;
    }
    get position() {
        return this.#position;
    }
    set position(position) {
        this.#position = position;
    }
    get color() {
        return this._color;
    }
    init() {
        this.#position = this.#board.getRandomalFreePosition(null);
        Screen.paint(this.#position, Settings.foodColor);
    }
    move() {
        this.#position = this.#board.getRandomalFreePosition(this.#position);
        Screen.paint(this.#position, Settings.foodColor);
        this.#board.insert(this.#position, Entity.FOOD);
    }
}
export {Food};