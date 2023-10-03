class Position {
    _x;
    _y;

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get x () {
        return this._x; 
    }
    get y () {
        return this._y;
    }
    set x (x) {
        this._x = x;
    }
    set y (y) {
        this._y = y;
    }
    static areEqual(position1, position2) {
        return position1.x === position2.x && position1.y == position2.y;
    }
}
export {Position};