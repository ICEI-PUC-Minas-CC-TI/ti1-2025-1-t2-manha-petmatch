import { SessionInterface } from './db-interface/session-interface.js';

const sessionInterface = new SessionInterface();

async function loadSession() {
    await sessionInterface.checkSession();
}

document.addEventListener("DOMContentLoaded", loadSession);