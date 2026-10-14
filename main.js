"use strict";

import { permanentLazyWrapper } from "./genericUtils.js";

const canvas = document.querySelector("canvas#pixel-canvas");

// fix: later make it so it detects when resize or something happens and changes later.

const canvasBoundingRect = canvas.getBoundingClientRect(); // permanentLazyWrapper(param => canvas.getBoundingClientRect()[param])
const canvasComputedStyle = window.getComputedStyle(canvas);
// canvas.width = 100;
// canvas.height = 100;

const ctx = canvas.getContext("2d");

window.canvas = canvas; window.ctx = ctx; window.canvasBoundingRect = canvasBoundingRect; window.canvasComputedStyle = canvasComputedStyle;

ctx.fillStyle = "green";

// ctx.fillRect(25, 25, 50, 50);

for (let xy = 0; xy < 100*100; xy++) {
    if ((xy - !!(Math.floor(xy / 100) % 2)) % 2) ctx.fillRect(xy % 100, Math.floor(xy / 100), 1, 1)
}

console.log(canvasBoundingRect)

ctx.fillStyle = "blue";

canvas.addEventListener("mousemove", e => {
    let mouseX = Math.floor((e.clientX-canvasBoundingRect.left) / (canvasBoundingRect.width / canvas.width)),
        mouseY = Math.floor((e.clientY-canvasBoundingRect.top) / (canvasBoundingRect.width / canvas.width));
    ctx.fillRect(mouseX, mouseY, 1, 1);
    console.log(`X: ${mouseX} Y: ${mouseY}`);
});