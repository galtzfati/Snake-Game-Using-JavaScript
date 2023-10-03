class Level {
    _snakeSpeed;
    _withTunnels;

    set snakeSpeed(snakeSpeed) {
        this._snakeSpeed = snakeSpeed;
    }
    set withTunnels(withTunnels) {
        this._withTunnels = withTunnels;
    }
    get snakeSpeed() {
        return this._snakeSpeed;
    }
    get withTunnels() {
        return this._withTunnels;
    }
}
export {Level};