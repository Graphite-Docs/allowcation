import { getGlobal } from 'reactn';

export function handleSignIn(e) {
    const { userSession } = getGlobal();
    const origin = window.location.origin;
    e.preventDefault();
    userSession.redirectToSignIn(origin, origin + '/manifest.json', ['store_write'])
}
export function handleSignOut() {
    const { userSession } = getGlobal();
    userSession.signUserOut(window.location.origin);
}