import {SessionInterface} from '../db-interface/session-interface.js'

document.addEventListener('DOMContentLoaded', async () => {
    const sessionInterface = new SessionInterface()

    sessionInterface.checkSession()
} )
