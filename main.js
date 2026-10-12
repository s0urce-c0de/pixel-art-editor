"use strict";

import { permanentLazyWrapper } from "./genericUtils.js";

const canvas = document.querySelector("canvas#pixel-canvas");

// fix: later make it so it detects when resize or something happens and changes later.

const canvasBoundingRect = permanentLazyWrapper(param => canvas.getBoundingClientRect()[param])
const canvasComputedStyle = window.getComputedStyle(canvas);
// canvas.width = 100;
// canvas.height = 100;

const ctx = canvas.getContext("2d");

window.canvas = canvas; window.ctx = ctx; window.canvasBoundingRect = canvasBoundingRect; window.canvasComputedStyle = canvasComputedStyle;

ctx.fillStyle = "green";

// ctx.fillRect(25, 25, 50, 50);

for (let xy = 0; xy < 400*400; xy++) {
    if ((xy - !!(Math.floor(xy / 400) % 2)) % 2) ctx.fillRect(xy % 400, Math.floor(xy / 400), 1, 1)
}

canvas.addEventListener("mousemove", e => {
    console.log(`X: ${e.clientX-canvasBoundingRect.left} Y: ${e.clientY-canvasBoundingRect.top}`);
});