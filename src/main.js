"use strict";

import { Shape, Rectangle } from "./shapes/shapes.js";
import { RenderingContext2D } from "./types.js";

/** @define {boolean} */
const COMPILED = false;

/** @type {HTMLCanvasElement} */
const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector("canvas#pixel-canvas"));

// fix: later make it so it detects when resize or something happens and changes later.

/** @type {DOMRect} */
const canvasBoundingRect = canvas.getBoundingClientRect();
/** @type {CSSStyleDeclaration} */
const canvasComputedStyle = window.getComputedStyle(canvas);
canvas.width = 8;
canvas.height = 8;

/**
 * A single canvas layer
 */
class Layer {
    /**
     * @type {OffscreenCanvas} The internal canvas
     * @private
     */
    _canvas;
    /**
     * @type {OffscreenCanvasRenderingContext2D} A 2D context of the internal canvas
     * @private
     */
    _ctx;

    /**
     * Constructs the canvas
     * 
     * @param {HTMLCanvasElement} canvas The canvas element to reference for the shape.
     */
    constructor(canvas) {
        this._canvas = new OffscreenCanvas(canvas.width, canvas.height);
        this._ctx = /** @type {OffscreenCanvasRenderingContext2D} */((this._canvas.getContext("2d")));
    }

    /**
     * Draw a shape on the offscreen canvas
     * 
     * @param {Shape} shape 
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
     * @param {RenderingContext2D} ctx 
     * @returns {void}
     */
    drawOn(ctx) {
        ctx.drawImage(this._canvas, 0, 0);
    }
}

/** @type {!Array<!Layer>} */
const layers = [];

/** @type {CanvasRenderingContext2D} */
const ctx = /** @type {CanvasRenderingContext2D} */(canvas.getContext("2d"));

const cursorLayer = new Layer(canvas);
layers.push(cursorLayer);

// this gets removed for builds and what not.
// /* closure and vscode linters make me do this */ // @ts-ignore
// window["canvas"] = canvas; // @ts-ignore
// window["ctx"] = ctx; // @ts-ignore
// window["canvasBoundingRect"] = canvasBoundingRect; // @ts-ignore
// window["canvasComputedStyle"] = canvasComputedStyle; // @ts-ignore
// window["layers"] = layers; // @ts-ignore
// window["Layer"] = Layer;


ctx.fillStyle = "green";

// ctx.fillRect(25, 25, 50, 50);

for (let xy = 0; xy < canvas.width*canvas.height; xy++) if ((xy - +(!!(Math.floor(xy / canvas.width) % 2))) % 2) ctx.fillRect(xy % canvas.width, Math.floor(xy / canvas.width), 1, 1);

canvas.addEventListener("mousemove", e => {
    let mouseX = Math.floor((e.clientX-canvasBoundingRect.left) / (canvasBoundingRect.width / canvas.width)),
        mouseY = Math.floor((e.clientY-canvasBoundingRect.top) / (canvasBoundingRect.height / canvas.height));
    // ctx.fillRect(mouseX, mouseY, 1, 1);
    cursorLayer.clear();

    cursorLayer.draw(new Rectangle(mouseX, mouseY, 1, 1, "rgba(128, 128, 128, 0.9)"));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let xy = 0; xy < canvas.width*canvas.height; xy++) if ((xy - +(!!(Math.floor(xy / canvas.width) % 2))) % 2) ctx.fillRect(xy % canvas.width, Math.floor(xy / canvas.width), 1, 1);

    for (const layer of layers) {
        layer.drawOn(ctx);
    }

    // console.log(`X: ${mouseX} Y: ${mouseY}`);
});