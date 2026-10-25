import Submenu from "./base.js";

export let file = new Submenu("File", [
    {name: "test", item: ()=>alert("foo")}
]);