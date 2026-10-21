/**
 * @fileoverview A base file to base submenus from
 */

/**
 * @typedef {[string, SubmenuItems|function]} SubmenuItem
 */
let SubmenuItem = void 0;

/**
 * @typedef {Array<SubmenuItem>} SubmenuItems
 */
let SubmenuItems = void 0;

/**
 * Make a submenu
 */
export default class Submenu {
    /**
     * 
     * @param {SubmenuItems} items 
     */
    constructor(items) {
        this._items = items;
    }
}