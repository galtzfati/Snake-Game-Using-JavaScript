import { Entity } from "./Entity.js";
import { Screen } from "./Screen.js";
import * as Settings from "./Settings.js";
class Food {
    _position;
    _board;

    constructor(board) {
        this._board = board;
    }
    get position() {
        return this._position;
    }
    set position(position) {
        this._position = position;
    }
    get color() {
        return this._color;
    }
    init() {
        this._position = this._board.getRandomalFreePosition(null);
        Screen.paint(this._position, Settings.foodColor);
    }
    move() {
        this._position = this._board.getRandomalFreePosition(this._position);
        Screen.paint(this._position, Settings.foodColor);
        this._board.insert(this._position, Entity.FOOD);
    }
}
export {Food};