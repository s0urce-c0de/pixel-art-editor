/**
 * A shape class to extend from
 */
export default class Shape {
    constructor() {
        if (new.target == Shape) throw new Error("Don't make this directly! Make a subclass!")
    }

    /**
     * Draw a shape
     * 
     * @param {CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D} _ctx Canvas context to draw on
     */
    draw(_ctx) {
        throw new Error("Override me with your own draw method!");
    }
}