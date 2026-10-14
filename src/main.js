"use strict";

import { Rectangle } from "./shapes/shapes.js";
import Layer from "./layer.js";

/** @type {HTMLCanvasElement} */
const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector("canvas#pixel-canvas"));

canvas.width = 8;
canvas.height = 8;

// fix: later make it so it detects when resize or something happens and changes later.

/**
 * @type {{X: number, Y: number, show: boolean}} mouse position
 */
const mouse = {
    X: -1,
    Y: -1,
    show: true
}

/** @type {DOMRect} */
var canvasBoundingRect = canvas.getBoundingClientRect();
// /** @type {CSSStyleDeclaration} */
// const canvasComputedStyle = window.getComputedStyle(canvas);

/** @type {!Array<!Layer>} */
const layers = [];

/** @type {CanvasRenderingContext2D} */
const ctx = /** @type {CanvasRenderingContext2D} */(canvas.getContext("2d"));

const cursorLayer = new Layer(ctx);
layers.push(cursorLayer);

const BGLayer = new Layer(ctx);
layers.unshift(BGLayer);

ctx.fillStyle = "green";

for (let xy = 0; xy < canvas.width*canvas.height; xy++) if ((xy - +(!!(Math.floor(xy / canvas.width) % 2))) % 2) BGLayer.draw(new Rectangle(xy % canvas.width, Math.floor(xy / canvas.width), 1, 1, "green"));

for (const layer of layers) layer.drawOn(ctx);

window.addEventListener("resize", _ => {
    canvasBoundingRect = canvas.getBoundingClientRect();
})

canvas.addEventListener("mouseenter", _ => {
    mouse.show = true;
    // here mousemove should be called automatically
})

canvas.addEventListener("mousemove", function canvasOnMouseMove(e){
    mouse.X = Math.floor((e.clientX-canvasBoundingRect.left) / (canvasBoundingRect.width / canvas.width)),
    mouse.Y = Math.floor((e.clientY-canvasBoundingRect.top) / (canvasBoundingRect.height / canvas.height));
});

canvas.addEventListener("mouseleave", _ => {
    mouse.show = false;
    mouse.X = -1;
    mouse.Y = -1;
})

requestAnimationFrame(function tick() {
    cursorLayer.clear();

    if(mouse.show) cursorLayer.draw(new Rectangle(mouse.X, mouse.Y, 1, 1, "rgba(128, 128, 128, 0.9)"));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const layer of layers) {
        layer.drawOn(ctx);
    }
    requestAnimationFrame(tick);
})