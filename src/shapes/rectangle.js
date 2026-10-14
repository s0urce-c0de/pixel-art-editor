import Shape from "./base.js";

/**
 * Rectangle
 */
export default class Rectangle extends Shape {
    /**
     * @type {number} X value of top-left corner
     * @private
     */
    _x;
    /**
     * @type {number} Y value of top-left corner
     * @private
     */
    _y;
    /**
     * @type {number} Width of shape
     * @private
     */
    _width;
    /**
     * @type {number} Height of shape
     * @private
     */
    _height;

    /**
     * Creates instance of Rect
     * 
     * @param {number} x X value for top-left corner
     * @param {number} y Y value for top-left corner
     * @param {number} width Width of rectangle
     * @param {number} height Height of rectangle
     */
    constructor(x, y, width, height) {
        super();
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }
};