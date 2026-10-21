import submenus from "./submenus/submenu.js";

/**
 * Basically initializes the navigation elements
 * 
 * @param {!HTMLUListElement|!HTMLOListElement} navElem The element to inject nav elements into
 * @returns {Promise<void>}
 */
export async function initNav(navElem) {
    for (const submenu of submenus) {
        // console.log(submenu);
    }
}