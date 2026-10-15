"use strict";

import { MousePos, CanvasSize } from "./types.js";
import { Rectangle } from "./shapes/shapes.js";
import Layer from "./layer.js";
import { boundingRectToCanvasSize, Point, scaleCoordinates } from "./utils.js";

// /** @type {Object<string, boolean | number>} */
// const state = {};

/** @type {!HTMLCanvasElement} */
const canvas = /** @type {!HTMLCanvasElement} */ (document.querySelector("canvas#pixel-canvas"));

canvas.width = 8;
canvas.height = 8;

/**
 * @type {!MousePos} mouse position
 */
const mouse = {
    x: -1,
    y: -1,
    show: true,
    down: false,
    eventlog: []
}

/** @type {!CanvasSize} */
let canvasSize = boundingRectToCanvasSize(canvas.getBoundingClientRect());

// /** @type {CSSStyleDeclaration} */
// const canvasComputedStyle = window.getComputedStyle(canvas);

/** @type {!Array<!Layer>} */
const layers = [];

/** @type {!CanvasRenderingContext2D} */
const ctx = /** @type {!CanvasRenderingContext2D} */(canvas.getContext("2d"));

const drawLayer = new Layer(ctx);
layers.push(drawLayer);

const cursorLayer = new Layer(ctx);
layers.push(cursorLayer);

const BGLayer = new Layer(ctx);
layers.unshift(BGLayer);

ctx.fillStyle = "green";

for (let xy = 0; xy < canvas.width*canvas.height; xy++) if ((xy - +(!!(Math.floor(xy / canvas.width) % 2))) % 2) BGLayer.draw(new Rectangle(xy % canvas.width, Math.floor(xy / canvas.width), 1, 1, "green"));

for (const layer of layers) layer.drawOn(ctx);

window.addEventListener("resize", _ => boundingRectToCanvasSize(canvas.getBoundingClientRect(), canvasSize));

// here mousemove should be called automatically
canvas.addEventListener("mouseenter", _ => mouse.show = true);

canvas.addEventListener("mousemove", function canvasOnMouseMove(e){
    [mouse.x, mouse.y] = scaleCoordinates(new Point(e.clientX, e.clientY), canvas, canvasSize);
});

canvas.addEventListener("mouseleave", _ => {
    mouse.show = false;
    mouse.x = mouse.y = -1;
});

// so to explain why i dont manipulate it manually is so that i can push states
// like if you moved the mouse a lot in one second

canvas.addEventListener("mousedown", e => {
    mouse.eventlog.push({
        .../** @type {{x: number, y: number}} */(scaleCoordinates(new Point(e.clientX, e.clientY), canvas, canvasSize)),
        action: "down"
    });
});

canvas.addEventListener("mousemove", e =>
    mouse.eventlog.push({
        x: e.clientX,
        y: e.clientY,
        action: "move"
    })
);

canvas.addEventListener("mouseup", e =>
    mouse.eventlog.push({
        x: e.clientX,
        y: e.clientY,
        action: "up"
    })
);

requestAnimationFrame(function tick() {
    cursorLayer.clear();

    for (let mouseEvent of mouse.eventlog) {
        switch (mouseEvent.action) {
            case "down":
                mouse.down = true;
                drawLayer.draw(new Rectangle(mouseEvent.x, mouseEvent.y, 1, 1));
        }
    }

    if(mouse.show) cursorLayer.draw(new Rectangle(mouse.x, mouse.y, 1, 1, "rgba(128, 128, 128, 0.9)"));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const layer of layers) {
        layer.drawOn(ctx);
    }

    requestAnimationFrame(tick);
})