/**
 * @fileoverview Basic utilities for usage
 */

import Layer from "./layer.js";
import { Canvas, RenderingContext2D } from "./types.js";

/**
 * A point
 */
export class Point {
    /**
     * X coordinate of point
     * 
     * @type {!number}
     */
    x;

    /**
     * Y coordinate of point
     * 
     * @type {!number}
     */
    y;

    /**
     * Construct a point
     * 
     * @param {!number} x X coordinate or point
     * @param {!number} y Y coordinate of point
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Canvas element to scale the point to
     * 
     * @param {!Canvas} canvas The canvas that should be scaled to
     * @returns {!Point}
     */
    scale(canvas) {
        this.x = Math.floor((this.x - canvas._brect.left) / (canvas._brect.width / canvas.width));
        this.y = Math.floor((this.y - canvas._brect.top) / (canvas._brect.height / canvas.height));
        return this;
    }

    // this is currently unused. might let closure compile faster.
    // /**
    //  * Destructuring support
    //  * 
    //  * @returns {Generator<!number>}
    //  */
    // *[Symbol.iterator]() {
    //     yield this.x;
    //     yield this.y;
    // }
}

/**
 * Save the layers of a canvas to an image
 * 
 * @param {!Array<!Layer>} layers The layers to stack on
 * @param {!RenderingContext2D} ctx The target rending context
 * @param {!boolean=} noclear Dont clear the canvas
 * @returns {void}
 */
export function packLayers(layers, ctx, noclear = false) {
    if (!noclear) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let layer of layers) {
        layer.drawOn(ctx);
    }
}

/**
 * Save the layers of a canvas to an image
 * 
 * @param {!Array<!Layer>} layers The layers to stack on
 * @param {number} width Width of canvas
 * @param {number} height Height of canvas
 * @returns {Promise<void>}
 */
export function saveImage(layers, width, height) {
    /** @type {!OffscreenCanvas} */
    let out = new OffscreenCanvas(width, height);
    /** @type {!OffscreenCanvasRenderingContext2D} */
    let outCtx = /** @type {!OffscreenCanvasRenderingContext2D} */(out.getContext("2d"));

    packLayers(layers, outCtx);

    return out.convertToBlob().then(blob => {
        /** @type {string} */
        const url = URL.createObjectURL(blob);
        /** @type {!HTMLAnchorElement} */
        const a = /** @type {!HTMLAnchorElement} */(document.createElement("a"));

        a.href = url;
        a.download = "output.png";
        a.click();

        URL.revokeObjectURL(url);
    });
}

/**
 * Save the layers of a canvas to a clipboard
 * 
 * @param {!Array<!Layer>} layers The layers to stack on
 * @param {number} width Width of canvas
 * @param {number} height Height of canvas
 * @returns {Promise<void>}
 */
export function copyImage(layers, width, height) {
    /** @type {!OffscreenCanvas} */
    let out = new OffscreenCanvas(width, height);
    /** @type {!OffscreenCanvasRenderingContext2D} */
    let outCtx = /** @type {!OffscreenCanvasRenderingContext2D} */(out.getContext("2d"));

    packLayers(layers, outCtx);

    return out.convertToBlob().then(blob => navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]));
}

/**
 * information about the device
 */
class DeviceInfo {
    /**
     * Gets if the device is a macbook.
     * 
     * @returns {!boolean}
     * @export
     */
    get isMac() {
        Object.defineProperty(this, "isMac", {
            value: navigator.userAgent.toLowerCase().includes("mac"),
            writable: false,
            configurable: true,
            enumerable: true
        });

        return this.isMac;
    }
}

/** @type {DeviceInfo} */
export const device = new DeviceInfo;