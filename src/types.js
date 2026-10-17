/**
 * A file with types
 */
import { Point } from "./utils.js";

/**
 * @typedef {(!OffscreenCanvasRenderingContext2D | !CanvasRenderingContext2D)} RenderingContext2D
 * A combination of Offscreen and Onscreen rendering contexts
 */
export let RenderingContext2D = void 0;

/**
 * @typedef {{
 *  top: !number,
 *  bottom: !number,
 *  left: !number,
 *  right: !number,
 *  width: !number,
 *  height: !number
 * }} CanvasSize
 * A canvas size element which is an in essence strippped down bounding box.
 */
export let CanvasSize = void 0;

/**
 * @typedef {{
 *  pos: !Point,
 *  action: !string,
 *  buttons: !number
 * }} MouseAction
 * A single mouse action for storage in a queue
 */
export let MouseAction = void 0;


/**
 * @typedef {{
 *  pos: !Point,
 *  show: !boolean,
 *  currentButtons: !number,
 *  eventlog: !Array<!MouseAction>
 * }} MousePos
 * Type to store information about a mouse
 */
export let MousePos = void 0;

/**
 * Look at what you made me do closure...
 */
export class Canvas extends HTMLCanvasElement {
    constructor() {
        super();
        /** @type {!DOMRect} */
        this._brect;
    }
}