export class CurrentSession {
    sessionData
    constructor() {
        const sessionRaw = localStorage.getItem("session");

        this.sessionData = JSON.parse(sessionRaw);
    }
    get userId() {
        return this.sessionData.session.props.userId
    }

    get donorId() {
        return this.sessionData.session.props.donorId
    }

    get expiresAt() {
        return this.sessionData.session.props.expiresAt
    }

    get type() {
        return this.sessionData.session.props.entityType
    }

    get currentUser() {
        return this.sessionData.user.props

    }
}