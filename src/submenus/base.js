/**
 * @fileoverview A base file to base submenus from
 */


/**
 * @typedef {{name: string, item: (!SubmenuItems|!function(!MouseEvent=):?)}} SubmenuItem A submenu item
 */
export let SubmenuItem = void 0;

/**
 * @typedef {Array<!SubmenuItem>} SubmenuItems Array of submenu item
 */
export let SubmenuItems = void 0;

/**
 * Make a submenu
 */
export default class Submenu {
    /**
     * @type {string} Name of the submenu
     */
    name;
    /**
     * @type {!SubmenuItems} The submenu items.
     */
    items;
    /**
     * @param {string} name 
     * @param {!SubmenuItems} items 
     */
    constructor(name, items) {
        this.name = name;
        this.items = items;
    }
}