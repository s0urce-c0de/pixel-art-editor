/**
 * @fileoverview A base file to base submenus from
 */

import { Shortcut } from "./types.js";

/** @typedef {{func: !function(!MouseEvent=):?, shortcut: (Shortcut|undefined)}} SubmenuFunctionItem */
export let SubmenuFunctionItem = void 0;

/** @typedef {(!SubmenuItems|SubmenuFunctionItem)} SubmenuItemItem */
export let SubmenuItemItem = void 0;

/**
 * @typedef {{name: string, item: SubmenuItemItem }} SubmenuItem A submenu item
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
     * @param {string} name The name of the shortcut
     * @param {!SubmenuItems} items The item submenu or shortcut
     */
    constructor(name, items) {
        this.name = name;
        this.items = items;
    }
}