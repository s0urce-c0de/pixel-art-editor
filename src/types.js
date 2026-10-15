

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
 *  x: !number,
 *  y: !number,
 *  action: !string
 * }} MouseAction
 * A single mouse action for storage in a queue
 */
export let MouseAction = void 0;


/**
 * @typedef {{
 *  x: !number,
 *  y: !number,
 *  show: !boolean,
 *  down: !boolean,
 *  eventlog: !Array<!MouseAction>
 * }} MousePos
 * Type to store information about a mouse
 */
export let MousePos = void 0;

/**
 * @typedef {HTMLCanvasElement | OffscreenCanvas} Canvas
 * Combination of Canvas and OffscreenCanvas
 */
export let Canvas = void 0;