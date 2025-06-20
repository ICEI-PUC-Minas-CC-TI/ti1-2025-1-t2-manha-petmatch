import { JsonSessionRepository } from '../src/database/repositories/adoption/json-session-repository.js';
import { JsonDonorRepository } from '../src/database/repositories/adoption/json-donor-repository.js';
import { JsonUserRepository } from '../src/database/repositories/adoption/json-user-repository.js';
import { JsonAddressRepository } from '../src/database/repositories/adoption/json-address-repository.js';
import { AuthenticateUseCase } from '../src/domain/adoption/application/use-cases/authenticate.js';
import { GetSessionUseCase } from '../src/domain/adoption/application/use-cases/get-session.js';
import { VerifyToken } from '../utils/verify-token.js';

export class SessionInterface {
    #addressRepository = new JsonAddressRepository();
    #sessionRepository = new JsonSessionRepository(this.#addressRepository);
    #donorRepository = new JsonDonorRepository();
    #userRepository = new JsonUserRepository();

    async authenticate({ email, password }) {
        try {
            const authenticateUseCase = new AuthenticateUseCase(
                this.#sessionRepository,
                this.#userRepository,
                this.#donorRepository
            );

            const response = await authenticateUseCase.execute({ email, password });

            if (response.isLeft()) {
                console.error("Falha ao autenticar:", response.value);
                return response;
            }

            localStorage.setItem('session', JSON.stringify(response.value));
            return response;
        } catch (error) {
            console.error("Erro inesperado na autenticação:", error);
            return { error: "Erro inesperado na autenticação" };
        }
    }

    async checkSession() {
        try {
            const sessionRaw = localStorage.getItem("session");
            if (!sessionRaw) return this.#redirectToLogin();

            const sessionData = JSON.parse(sessionRaw);
            if (!sessionData?.session?._id || !sessionData?.session?.props?.expiresAt) {
                return this.#handleInvalidSession();
            }

            const isValid = VerifyToken.isTokenValid(sessionData.session.props.expiresAt);
            console.log(isValid)
            if (!isValid) {
                return this.#handleInvalidSession();
            }

            const getSessionUseCase = new GetSessionUseCase(this.#sessionRepository);
            const response = await getSessionUseCase.execute({ sessionId: sessionData.session._id });

            if (response.isLeft()) {
                console.error("Sessão inválida:", response.value);

                return this.#handleInvalidSession();
            }

            localStorage.setItem("session", JSON.stringify(response.value));
            window.location.href = `${window.location.origin}/modulos/homepage/homepage.html`;
            return response;
        } catch (error) {
            console.error("Erro ao verificar sessão:", error);
            return this.#handleInvalidSession();
        }
    }

    logOut() {
        this.#clearSession();
        this.#redirectToLogin();
    }


    #handleInvalidSession() {
        this.#clearSession();
        this.#redirectToLogin();
    }

    #redirectToLogin() {
        window.location.href = `${window.location.origin}/modulos/login/index.html`;
    }

    #clearSession() {
        localStorage.removeItem("session");
    }
}