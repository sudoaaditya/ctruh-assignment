import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
    constructor() {
        super();

        this.frameId = window.requestAnimationFrame(() => {
            this.tick();
        });
    }

    tick = () => {
        this.frameId = window.requestAnimationFrame(this.tick);
        this.trigger("tick");
    }

    cancelAnimationFrame = () => {
        window.cancelAnimationFrame(this.frameId);
    };
}
