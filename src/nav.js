import config from "./config.js";
import Submenu from "./submenu.js";
import { Modifiers, Shortcut } from "./types.js";
import { device } from "./utils.js";

/**
 * @const {CSSStyleSheet}
 */
const NavStyleSheet = new CSSStyleSheet();

/**
 * @param {!ITemplateArray} strings
 * @param {...*} values
 * @return {string}
 */
const css = (strings, ...values) => strings.reduce(/**
     * @param {string} acc
     * @param {string} str
     * @param {number} i
     * @return {string}
     */(acc, str, i) => acc + str + (values[i] || ''), '');


NavStyleSheet.replaceSync(css`:host {
    grid-row: 1;
    width: 100%;
    background-color: #FFFFFF60;
    & > ul {
        /* Changed to display flex later */
        display: none;
        gap: 0.5em;
        list-style-type: none;
        margin: 0;
        padding: 0;

        & > img, & > li {
            --padding-vertical: 0.25em;
            --padding-horizontal: 0.75em;
            padding: var(--padding-vertical) var(--padding-horizontal);
            border-radius: 0.5em;
        }

        & > li {
            cursor: pointer;

            &:hover {
                background-color: #00000020;
            }

            &:active, &.active {
                background-color: #00000030;
            }
        }
    }

    & > div {
        & > ul.submenu {
            position: absolute;
            margin: 0;
            border-radius: 0.5em;
            border: 0;
            padding: 0.5em 0;
            /* CSS Fun fact: you need space around the plus for it to work */
            left: calc(anchor(left) + 0.5em);
            top: calc(anchor(bottom) + 0.25em);
            background-color: #FFFFFF60;
            min-width: 10%;

            & > li {
                padding: 0 0.5em;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                &:hover {
                    background-color: #00000020;
                }

                span:nth-child(2) {
                    color: darkgrey;
                }
            }
        }
    }
}`);

/* Detect popover with .matches(":popover-active") i think */
/**
 * Update a menubar item on popover.
 * 
 * @this {!HTMLElement} The menubar item
 * @param {!HTMLElement} popover The actual item that is popovered
 * @param {!MouseEvent} e 
 * @returns {void}
 */
function onMenubarItemClick(popover, e) {
    popover.togglePopover();
}

/**
 * HTML NavElem
 */
export default class NavElem extends HTMLElement {
    /** 
     * Shadow root of the NavElement
     * 
     * @private
     * @type {!ShadowRoot}
     */
    _root;

    /**
     * @private
     * @type {!HTMLUListElement}
     */
    _menulist;

    /**
     * @private
     * @type {!HTMLDivElement}
     */
    _submenus;

    /**
     * @private
     * @type {!Object<string, !HTMLElement>}
     */
    _shortcuts;

    constructor() {
        super();
        this._root = this.attachShadow({ mode: "closed" });
        this._root.adoptedStyleSheets = [NavStyleSheet];

        this._menulist = /** @type {!HTMLUListElement} */(document.createElement("ul"));
        this._submenus = /** @type {!HTMLDivElement} */(document.createElement("div"));
        this._shortcuts = {};

        /** @type {!HTMLImageElement} */
        const logo = config.logo;
        logo.style.height = "1em";

        this._menulist.appendChild(logo);

        this._root.appendChild(this._menulist);
        this._root.append(this._submenus);
    }

    /**
     * Initialize the element with data.
     * 
     * @param {!Array<!Submenu>} submenus The submenus to add
     * @returns {void}
     */
    init(submenus) {
        for (let i = 0; i < submenus.length; i++) {
            /** @const {!Submenu} */
            const submenu = submenus[i];
            /** @type {!HTMLLIElement} */
            let li = /** @type {!HTMLLIElement} */(document.createElement("li"));
            li.textContent = submenu.name;
            /* Shouldn't repeat since I think it stops are shadow-dom boundary */
            li.id = `submenus-${i}`;
            li.style.anchorName = `--${li.id}`;

            this._menulist.appendChild(li);

            /** @type {!HTMLUListElement} */
            const submenu_el = /** @type {!HTMLUListElement} */(document.createElement("ul"));

            for (const {name, item} of submenu.items) {
                /** @const {!HTMLLIElement} */
                const submenu_item = /** @type {!HTMLLIElement} */(document.createElement("li"));

                if (Array.isArray(item)) {
                    throw new Error("Should be a string! NO nesting support uet!");
                } else if (item.func instanceof Function) {
                    /** @const {!HTMLSpanElement} */
                    const submenu_item_name = /** @type {!HTMLSpanElement} */(document.createElement("span"));
                    submenu_item_name.textContent = name;

                    submenu_item.appendChild(submenu_item_name);
                    
                    console.log(item);

                    if (item.shortcut) {
                        /** @const {!HTMLSpanElement} */
                        const submenu_item_shorcut = /** @type {!HTMLSpanElement} */(document.createElement("span"));

                        submenu_item_shorcut.textContent = item.shortcut.toString();

                        submenu_item.appendChild(submenu_item_shorcut);

                        this._shortcuts[item.shortcut.toString()] = submenu_item;
                    }
                    submenu_item.addEventListener("click", /** @type {function(Event):*} */(item.func));
                } else {
                    throw new Error("Something fucked up happened");
                }

                submenu_el.appendChild(submenu_item);
            }

            window.addEventListener("keydown", /** @type {function(Event):*} */((/** @type {KeyboardEvent} */e) => {
                if(e.repeat) return;
                /** @type {number} */
                let mod = 0;
                /** @type {string} */
                let shortcut;

                mod |= +(e.shiftKey && Modifiers.SHIFT);
                mod |= +((device.isMac ? e.metaKey : e.ctrlKey) && Modifiers.CTRL);
                mod |= +(e.altKey && Modifiers.ALT);

                if (this._shortcuts.hasOwnProperty(shortcut = (new Shortcut(mod, device.isMac ? String.fromCharCode(e.keyCode) : e.key)).toString())) {
                    e.preventDefault();
                    this._shortcuts[shortcut].click();
                }
            }));

            submenu_el.popover = "manual";
            submenu_el.style.positionAnchor = li.style.anchorName;
            submenu_el.classList.add("submenu");
            
            li.addEventListener("click", /** @type {function(Event):*} */(onMenubarItemClick.bind(li, submenu_el)));

            this._submenus.append(submenu_el);
        }

        this._menulist.style.display = "flex";
    }
}

customElements.define("nav-elem", NavElem);