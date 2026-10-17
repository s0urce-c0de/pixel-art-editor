/**
 * @fileoverview Basic utilities for usage
 */

import { Canvas } from "./types.js";

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

    /**
     * Destructuring support
     * 
     * @returns {Generator<!number>}
     */
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
}