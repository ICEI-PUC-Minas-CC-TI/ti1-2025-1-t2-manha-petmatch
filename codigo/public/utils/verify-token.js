export class VerifyToken {
    static isTokenValid(expireDate) {
        const now = new Date();
        const expiresAt = new Date(expireDate);

        const isValid = now <= expiresAt;

        return isValid
    }

}