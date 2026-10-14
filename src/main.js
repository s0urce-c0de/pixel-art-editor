"use strict";

/** @type {HTMLCanvasElement} */
const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector("canvas#pixel-canvas"));

// fix: later make it so it detects when resize or something happens and changes later.

/** @type {DOMRect} */
const canvasBoundingRect = canvas.getBoundingClientRect();
/** @type {CSSStyleDeclaration} */
const canvasComputedStyle = window.getComputedStyle(canvas);
// canvas.width = 100;
// canvas.height = 100;

class Layer {

    /**
     * Constructs the canvas
     * 
     * @param {*} canvas The canvas element to reference for the shape.
     * @returns {void}
     */
    constructor(canvas) {
        /**
         * @type {OffscreenCanvas} The internal canvas
         * @private
         */
        this._canvas = new OffscreenCanvas(canvas.width, canvas.height);
        console.log(this._canvas);
    }

    /**
     * Draw a shape on the offscreen canvas
     * 
     * @param {*} shape 
     * @param {...*} params 
     * @returns {void}
     */
    drawShape(shape, ...params) {

    }
}

/** @type {Array<Layer>} */
const layers = [];

/** @type {CanvasRenderingContext2D} */
const ctx = /** @type {CanvasRenderingContext2D} */(canvas.getContext("2d"));

window.canvas = canvas;
window.ctx = ctx;
window.canvasBoundingRect = canvasBoundingRect;
window.canvasComputedStyle = canvasComputedStyle;
window.layers = layers;
window.Layer = Layer;

ctx.fillStyle = "green";

// ctx.fillRect(25, 25, 50, 50);

for (let xy = 0; xy < 100*100; xy++) {
    if ((xy - !!(Math.floor(xy / 100) % 2)) % 2) ctx.fillRect(xy % 100, Math.floor(xy / 100), 1, 1)
}

console.log(canvasBoundingRect);

ctx.fillStyle = "blue";

canvas.addEventListener("mousemove", e => {
    let mouseX = Math.floor((e.clientX-canvasBoundingRect.left) / (canvasBoundingRect.width / canvas.width)),
        mouseY = Math.floor((e.clientY-canvasBoundingRect.top) / (canvasBoundingRect.width / canvas.width));
    ctx.fillRect(mouseX, mouseY, 1, 1);
    console.log(`X: ${mouseX} Y: ${mouseY}`);
});