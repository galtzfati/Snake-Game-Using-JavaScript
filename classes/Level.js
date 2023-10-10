class Level {
    #snakeSpeed;
    #withTunnels;

    set snakeSpeed(snakeSpeed) {
        this.#snakeSpeed = snakeSpeed;
    }
    set withTunnels(withTunnels) {
        this.#withTunnels = withTunnels;
    }
    get snakeSpeed() {
        return this.#snakeSpeed;
    }
    get withTunnels() {
        return this.#withTunnels;
    }
}
export {Level};