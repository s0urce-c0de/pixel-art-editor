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
            background-color: #B0B0B080;

            & > * {
                padding: 0 0.5em;
                &:hover {
                    background-color: #B0B0B0F0;
                }
            }
        }
    }
}`)

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

    constructor() {
        super();
        this._root = this.attachShadow({ mode: "closed" });
        this._root.adoptedStyleSheets = [NavStyleSheet];

        this._menulist = /** @type {!HTMLUListElement} */(document.createElement("ul"));
        this._submenus = /** @type {!HTMLDivElement} */(document.createElement("div"));

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
            li.innerText = submenu.name;
            /* Shouldn't repeat since I think it stops are shadow-dom boundary */
            li.id = `submenus-${i}`
            li.style.anchorName = `--${li.id}`;

            this._menulist.appendChild(li);

            /** @type {!HTMLUListElement} */
            const submenu_el = /** @type {!HTMLUListElement} */(document.createElement("ul"));

            for (const {name, item} of submenu.items) {
                /** @const {!HTMLLIElement} */
                const submenu_item = /** @const {!HTMLLIElement} */(document.createElement("li"));
                submenu_item.innerText = name;
                if (item instanceof Function) {
                    /* TODO: Add code to dismis after the item is clicked. */
                    submenu_item.addEventListener("click", item);
                } else {
                    throw new Error("Should be a string! No nested support yet!");
                }

                submenu_el.appendChild(submenu_item);
            }

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