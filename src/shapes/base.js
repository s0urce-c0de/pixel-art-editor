/**
 * @fileoverview Provides a basic Shape constructor, mainly used for typing.
 */
import { RenderingContext2D } from "../types.js";

/**
 * A shape class to extend from
 */
export default class Shape {
    /**
     * Don't use this!
     */
    constructor() {
        if (new.target == Shape) throw new Error("Don't make this directly! Make a subclass!")
    }

    /**
     * Draw a shape
     * 
     * @param {!RenderingContext2D} _ctx Canvas context to draw on
     * @returns {void}
     */
    draw(_ctx) {
        throw new Error("Override me with your own draw method!");
    }
}