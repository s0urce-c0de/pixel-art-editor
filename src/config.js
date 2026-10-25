export default {
    // see logo.svg
    /**
     * @returns {!HTMLImageElement}
     */
    get logo() {
        /** @type {!HTMLImageElement} */
        const img = /** @type {!HTMLImageElement} */(document.createElement("img"));
        img.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iMTYwIiB2aWV3Qm94PSIwIDAgOSA5IiBmaWxsPSJub25lIj48cGF0aCBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS13aWR0aDoxO3N0cm9rZTojZmZmIiBkPSJNMCAwaDl2OUgweiIvPjxwYXRoIGQ9Ik0yLjUgMS41aDF2M2gtMXptMyAwaDF2M2gtMXptLTUgNGgxdjFoLTF6bTEgMWgxdjFoLTF6bTEgMWg0djFoLTR6bTUtMmgxdjFoLTF6bS0xIDFoMXYxaC0xeiIgZmlsbD0iI2YwMDkwOSIvPjwvc3ZnPg==";
        return img;
    }
};