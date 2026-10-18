"use strict";

import { MousePos, Canvas } from "./types.js";
import { Rectangle } from "./shapes/shapes.js";
import Layer from "./layer.js";
import { copyImage, device, packLayers, Point, saveImage } from "./utils.js";
import { initNav } from "./nav.js";

/** @type {!Canvas} */
const canvas = /** @type {!Canvas} */ (document.querySelector("canvas#pixel-canvas"));
canvas._brect = canvas.getBoundingClientRect();

/** @type {!HTMLUListElement} */
const nav = /** @type {!HTMLUListElement} */(document.querySelector("ul#nav-list"));

canvas.width = 8;
canvas.height = 8;

/**
 * @type {!MousePos} mouse position
 */
const mouse = {
    pos: new Point(-1, -1),
    show: true,
    // see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#value
    currentButtons: 0b000,
    eventlog: []
}

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

// for (let xy = 0; xy < canvas.width*canvas.height; xy++) if ((Math.floor(xy / canvas.width) + xy) % 2) BGLayer.draw(new Rectangle(new Point(xy % canvas.width, Math.floor(xy / canvas.width)), 1, 1, "green"));

for (const layer of layers) layer.drawOn(ctx);

window.addEventListener("resize", _ => canvas._brect = canvas.getBoundingClientRect());

// here mousemove should be called automatically
canvas.addEventListener("mouseenter", _ => mouse.show = true);

canvas.addEventListener("mousemove", function canvasOnMouseMove(e){
    mouse.pos = new Point(e.clientX, e.clientY).scale(canvas);
});

canvas.addEventListener("mouseleave", _ => {
    mouse.show = false;
    mouse.pos = new Point(-1, -1);
});

// so to explain why i dont manipulate it manually is so that i can push states
// like if you moved the mouse a lot in one second

/**
 * Handle a mouse event
 * 
 * @param {!string} action The action that gets pushed into the eventlog
 * @param {!MouseEvent} e Mouse event
 */
function mouseHandler(action, e) {
    mouse.eventlog.push({
        pos: new Point(e.clientX, e.clientY).scale(canvas),
        action,
        buttons: e.buttons
    });
}

canvas.addEventListener("mousedown", e => mouseHandler("down", /** @type {!MouseEvent} */(e)));
canvas.addEventListener("mousemove", e => mouseHandler("move", /** @type {!MouseEvent} */(e)));
canvas.addEventListener("mouseup", e => mouseHandler("up", /** @type {!MouseEvent} */(e)));

window.addEventListener("keydown", e => {   
    const ctrlKey = device.isMac ? e.metaKey : e.ctrlKey;

    if (ctrlKey) {
        switch (/** @type {KeyboardEvent} */(e).key) {
            case "s":
                e.preventDefault();
                saveImage([layers[1]], canvas.width, canvas.height);
                break;
            case "c":
                e.preventDefault();
                copyImage([layers[1]], canvas.width, canvas.height);
                break;
        }
    }
});

initNav(nav);

requestAnimationFrame(function tick() {
    cursorLayer.clear();

    for (let mouseEvent of mouse.eventlog) {
        // switch (mouseEvent.action) {
        //     case "down":
        //         mouse.down = true;
        //         break;
        //     case "move":
        //         break;
        //     case "up":
        //         mouse.down = false;
        //         break;
        //     default:
        //         break;
        // }
        mouse.currentButtons = mouseEvent.buttons;
        mouse.pos = mouseEvent.pos;
        if(mouseEvent.buttons & 1) drawLayer.draw(new Rectangle(mouse.pos, 1, 1, "rgb(240, 9, 9)"));
    }

    mouse.eventlog = [];

    if(mouse.show) cursorLayer.draw(new Rectangle(mouse.pos, 1, 1, "rgba(128, 128, 128, 0.5)"));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    packLayers(layers, ctx);

    requestAnimationFrame(tick);
});