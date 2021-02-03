import store from "../store";

export function permission(el: any, binding: any, vnode: any) {
    if (!hasPermissions(binding.value)) {
        vnode?.elm?.parentElement?.removeChild(vnode.elm);
    }
}

export function hasPermissions(roles: string[]) {
    const permissions = new Set<string>(roles);
    return permissions.has(store.user.role);
}
