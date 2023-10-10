import { Position } from "./Position.js";
import * as Settings from "./Settings.js";
class Screen {
    static #context;
    static #board;

    static get context() {
        return this.#context;
    }
    static get board() {
        return this.#board;
    }

    static init() {
        this.#board = document.getElementById("canvasGameContainer");
        this.#context = this.#board.getContext("2d");
        this.#context.font = Settings.font;
    }
    static paint(position, color) {
        this.#context.fillStyle = color;
        let x = position.x * Settings.unitSize;
        let y = position.y * Settings.unitSize;
        this.#context.fillRect(x, y, Settings.unitSize, Settings.unitSize);
        if (color != Settings.boardColor) {
            this.#addInternalRectangle(position);
        }
    }
    static erase(position) {
        this.paint(position, Settings.boardColor);
    }
    static write(text) {
        this.#context.fillStyle = Settings.textColor;
        this.#context.textAlign = "center";
        this.#context.fillText(text, this.#board.width / 2, this.#board.height / 2);
    }
    static #addInternalRectangle(position) {
        this.#context.fillStyle = Settings.extraColor;
        let x = position.x * Settings.unitSize + Settings.unitSize / 2 - Settings.unitSize / 4;
        let y = position.y * Settings.unitSize + Settings.unitSize / 2 - Settings.unitSize / 4;
        this.#context.fillRect(x, y, Settings.unitSize / 2, Settings.unitSize / 2);
    }
    static clear() {
        for (let y = 0; y < this.#board.height; y++) {
            for (let x = 0; x < this.#board.width; x++) {
                this.erase(new Position(x, y));
            }
        }
    }
}
export {Screen};