// ts = retarded. "property not defined even though it can be undefined"
// @ts-nocheck
import { Modifiers, Shortcut } from "../types.js";
import Submenu from "./base.js";

export let file = new Submenu("File", [
    {name: "test", item: {func: ()=>alert("foo"), shortcut: new Shortcut(Modifiers.CTRL, "T")}}
]);