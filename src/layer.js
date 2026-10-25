/**
 * @fileoverview Implements layers
 */
import { RenderingContext2D } from "./types.js";
import Shape from "./shapes/base.js";

/**
 * A single canvas layer
 */
export default class Layer {
    /**
     * @type {!RenderingContext2D} The reference canvas to draw upon
     * @private
     */
    _ref_ctx;
    /**
     * @type {!OffscreenCanvas} The internal canvas
     * @private
     */
    _canvas;
    /**
     * @type {!OffscreenCanvasRenderingContext2D} A 2D context of the internal canvas
     * @private
     */
    _ctx;

    /**
     * Constructs the canvas
     * 
     * @param {!RenderingContext2D} ctx The context to reference to.
     */
    constructor(ctx) {
        this._ref_ctx = ctx;
        this._canvas = new OffscreenCanvas(ctx.canvas.width, ctx.canvas.height);
        this._ctx = /** @type {!OffscreenCanvasRenderingContext2D} */((this._canvas.getContext("2d")));
    }

    /**
     * Draw a shape on the offscreen canvas
     * 
     * @param {!Shape} shape 
     * @returns {void}
     */
    draw(shape) {
        shape.draw(this._ctx);
    }

    /**
     * Clear the canvas 
     * 
     * @returns {void}
     */
    clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    /**
     * Draw this upon another canvas
     * 
     * @param {RenderingContext2D=} ctx 
     * @returns {void}
     */
    drawOn(ctx = this._ref_ctx) {
        ctx.drawImage(this._canvas, 0, 0);
    }
}