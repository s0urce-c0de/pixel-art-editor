"use strict";

export function permanentLazyWrapper(getter) {
    return new Proxy({}, {
        get(_, param) {
            return getter(param);
        }
    })
}

export default { permanentLazyWrapper };