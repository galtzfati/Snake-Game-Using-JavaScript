class Interval {
    _interval = null;

    set interval(interval) {
        if (!this._interval) {
            this._interval = interval;
        }
    }
    get interval() {
        return this._interval;
    }
    clearInterval() {
        if (this._interval) {
            clearInterval(this._interval);
            this._interval = null;
        }
    }
}
export {Interval};