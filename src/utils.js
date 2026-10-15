/**
 * @fileoverview Basic utilities for usage
 */

import { Canvas, CanvasSize } from "./types.js";

/**
 * A point
 * @implements {Iterable<number>}
 */
export class Point {
    /**
     * X coordinate of point
     * 
     * @type {number}
     */
    x;

    /**
     * Y coordinate of point
     * 
     * @type {number}
     */
    y;

    /**
     * Construct a point
     * 
     * @param {number} x X coordinate or point
     * @param {number} y Y coordinate of point
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Destructuring support
     * 
     * @returns {Generator<number>}
     */
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
}

/**
 * Convert a bounding rect into the regular object-based canvassize
 * 
 * @param {!DOMRect} boundingRect The base bounding rect
 * @param {(!CanvasSize | !Object<!string, !number>)=} canvasSize Optional pass in to here for updating an existing one.
 * @returns {!CanvasSize}
 */
export function boundingRectToCanvasSize(boundingRect, canvasSize) {
    /** @type {(!CanvasSize | !Object<!string, !number>)} */
    let tgt = canvasSize || {};
    (({ top, bottom, left, right, width, height }) => 
        Object.assign(tgt, { top, bottom, left, right, width, height }))(boundingRect);

    return /** @type {!CanvasSize} */(tgt);
}

/**
 * Scale coordinates to their actual size in the canvas
 * 
 * @param {!Point} coords The point to scale
 * @param {!Canvas} canvas The physical canvas
 * @param {!CanvasSize} canvasSize canvas size
 * @returns {!Point} [x, y] array of real coordinates
 */
export function scaleCoordinates(coords, canvas, canvasSize) {
    return new Point(
        Math.floor((coords.x - canvasSize.left) / (canvasSize.width / canvas.width)),
        Math.floor((coords.y - canvasSize.top) / (canvasSize.height / canvas.height))
    )
}