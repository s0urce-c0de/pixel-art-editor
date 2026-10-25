import config from "./config.js";
import Submenu from "./submenus/base.js";

/**
 * @const {CSSStyleSheet}
 */
const NavStyleSheet = new CSSStyleSheet();

NavStyleSheet.replaceSync(`:host {
    grid-row: 1;
    width: 100%;
    background-color: gray;
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
}`)

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

    constructor() {
        super();
        this._root = this.attachShadow({ mode: "closed" });
        this._root.adoptedStyleSheets = [NavStyleSheet];

        this._menulist = /** @type {!HTMLUListElement} */(document.createElement("ul"));

        /** @type {!HTMLImageElement} */
        const logo = config.logo;
        logo.style.height = "1em";

        this._menulist.appendChild(logo);

        this._root.appendChild(this._menulist);
    }

    /**
     * Initialize the element with data.
     * 
     * @param {!Array<!Submenu>} submenus The submenus to add
     * @returns {void}
     */
    init(submenus) {
        for (let i = 0; i < submenus.length; i++) {
            /** @const {Submenu} */
            const submenu = submenus[i];
            /** @type {HTMLLIElement} */
            let li = /** @type {HTMLLIElement} */(document.createElement("li"));
            li.innerText = submenu.name;
            /* Shouldn't repeat since I think it stops are shadow-dom boundary */
            li.style.anchorName = `submenus-${i}`;

            

            this._menulist.appendChild(li);
        }

        this._menulist.style.display = "flex";
    }
}

customElements.define("nav-elem", NavElem);

/**
 * Basically initializes the navigation elements
 * 
 * @param {!NavElem} navElem The element to inject nav elements into
 * @returns {Promise<void>}
 */
export async function initNav(navElem) {
    // /** @type {!HTMLUListElement} */
    // let navList = /** @type {!HTMLUListElement}*/ document.createElement("ul");
    // /** @type {!HTMLDivElement} */
    // let navMenu = /** @type {HTMLDivElement} */document.createElement("div");

    // for (const submenu of submenus) {
    //     let li = document.createElement("li");
    //     li.innerText = submenu.name;
    //     const li_menu = document.createElement("div");

    //     li_menu.classList.add("submenu");

    //     for(let {name, item} of submenu.items) {
    //         if (typeof item === "function") {
    //             li_menu.appendChild(/** @type {Node} */(Object.assign(document.createElement("span"), {textContent: name, onclick: item})));
    //         } else {}
    //     }

    //     navMenu.appendChild(li_menu);
    //     navList.appendChild(li);
    //     console.log(submenu.name);
    // }

    // navList.style.display = "flex";
    // navElem.appendChild(navList);
    // navElem.appendChild(navMenu);
}