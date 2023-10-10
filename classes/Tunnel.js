class Tunnel {
    #position;
    #exitTunnel;
    get exitTunnel() {
        return this.#exitTunnel;
    }
    set exitTunnel(exitTunnel) {
        this.#exitTunnel = exitTunnel;
    }
    get position() {
        return this.#position;
    }
    set position(position) {
        this.#position = position;
    }
}
export {Tunnel};