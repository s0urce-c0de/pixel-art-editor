/**
 * @fileoverview Implements a rectangle shape.
 */

import Shape from "./base.js";
import { RenderingContext2D } from "../types.js";

/**
 * Rectangle
 */
export default class Rectangle extends Shape {
    /**
     * @type {!number} X value of top-left corner
     * @private
     */
    _x;
    /**
     * @type {!number} Y value of top-left corner
     * @private
     */
    _y;
    /**
     * @type {!number} Width of shape
     * @private
     */
    _width;
    /**
     * @type {!number} Height of shape
     * @private
     */
    _height;
    /**
     * @type {!string} Fill style
     * @private
     */
    _fillStyle;

    /**
     * Creates instance of Rect
     * 
     * @param {!number} x X value for top-left corner
     * @param {!number} y Y value for top-left corner
     * @param {!number} width Width of rectangle
     * @param {!number} height Height of rectangle
     * @param {!string} [fillStyle="black"] Fill color
     */
    constructor(x, y, width, height, fillStyle = "black") {
        super();
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._fillStyle = fillStyle;
    }

    /**
     * Draw the shape onto a canvas
     * 
     * @param {!RenderingContext2D} _ctx 
     * @returns {void}
     */
    draw(_ctx) {
        _ctx.fillStyle = this._fillStyle;
        _ctx.fillRect(this._x, this._y, this._width, this._height);
    }
};