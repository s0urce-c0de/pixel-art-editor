/**
 * A file with types
 */
import { device, Point } from "./utils.js";

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
 * @enum {number} Key modifiers
 */
export let Modifiers = {
    SHIFT: 0b001,
    CTRL: 0b010, // CMD on mac os
    ALT: 0b100
};

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

/**
 * A class to represent a shortcut in JS
 */
export class Shortcut {
    /**
     * @type {number}
     */
    mod;

    /**
     * @type {string}
     */
    key;

    /**
     * @param {number} mod 
     * @param {string} key 
     */
    constructor(mod, key) {
        /**
         * @const {number}
         */
        this.mod = mod;

        /**
         * @const {string}
         */
        this.key = key.toLowerCase();
    }

    /**
     * @returns {string}
     */
    toString() {
        /** @type {!Array<string>} */
        let string = [];

        string.unshift(this.key.toUpperCase());

        if (device.isMac) {
            // https://developer.apple.com/design/human-interface-guidelines/keyboards#:~:text=List%20modifier%20keys%20in%20the%20correct%20order

            if (this.mod & Modifiers.CTRL) string.unshift("\u2318");
            if (this.mod & Modifiers.SHIFT) string.unshift("\u21e7");
            if (this.mod & Modifiers.ALT) string.unshift("\u2325");
        } else {
            if (this.mod & Modifiers.CTRL) string.unshift("Ctrl");
            if (this.mod & Modifiers.ALT) string.unshift("Alt");
            if (this.mod & Modifiers.SHIFT) string.unshift("Shift");
        }

        return string.join(device.isMac ? "" : "+");
    }
}