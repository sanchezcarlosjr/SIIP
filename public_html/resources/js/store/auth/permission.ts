import store from "../store";

 export function permission (el: any, binding: any, vnode: any) {
        const permissions = new Set<string>(binding.value);
        if (!permissions.has(store.user.role)) {
            vnode?.elm?.parentElement?.removeChild(vnode.elm);
        }
 }
