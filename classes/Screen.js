import { Position } from "./Position.js";
import * as Settings from "./Settings.js";
class Screen {
    static _context;
    static _board;

    static get context() {
        return this._context;
    }
    static get board() {
        return this._board;
    }

    static init() {
        this._board = document.getElementById("canvasGameContainer");
        this._context = this._board.getContext("2d");
        this._context.font = Settings.font;
    }
    static paint(position, color) {
        this._context.fillStyle = color;
        let x = position.x * Settings.unitSize;
        let y = position.y * Settings.unitSize;
        this._context.fillRect(x, y, Settings.unitSize, Settings.unitSize);
        if (color != Settings.boardColor) {
            this.addInternalRectangle(position);
        }
    }
    static erase(position) {
        this.paint(position, Settings.boardColor);
    }
    static write(text) {
        this._context.fillStyle = Settings.textColor;
        this._context.textAlign = "center";
        this._context.fillText(text, this._board.width / 2, this._board.height / 2);
    }
    static addInternalRectangle(position) {
        this._context.fillStyle = Settings.extraColor;
        let x = position.x * Settings.unitSize + Settings.unitSize / 2 - Settings.unitSize / 4;
        let y = position.y * Settings.unitSize + Settings.unitSize / 2 - Settings.unitSize / 4;
        this._context.fillRect(x, y, Settings.unitSize / 2, Settings.unitSize / 2);
    }
    static clear() {
        for (let y = 0; y < this._board.height; y++) {
            for (let x = 0; x < this._board.width; x++) {
                this.erase(new Position(x, y));
            }
        }
    }
}
export {Screen};