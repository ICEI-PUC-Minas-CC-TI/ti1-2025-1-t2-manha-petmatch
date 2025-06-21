import { SessionInterface } from './db-interface/session-interface.js';

const sessionInterface = new SessionInterface();

async function loadSession() {
    const reponse = await sessionInterface.checkSession();
    if(reponse?.isRight()) {
        window.location.href = `${window.location.origin}/modulos/homepage/homepage.html`;
    }
}

document.addEventListener("DOMContentLoaded", loadSession);