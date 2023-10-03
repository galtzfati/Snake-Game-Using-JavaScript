class Tunnel {
    _position;
    _exitTunnel;
    get exitTunnel() {
        return this._exitTunnel;
    }
    set exitTunnel(exitTunnel) {
        this._exitTunnel = exitTunnel;
    }
    get position() {
        return this._position;
    }
    set position(position) {
        this._position = position;
    }
}
export {Tunnel};