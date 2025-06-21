import { right, left } from '../../../../../core/Either.js';

import { RequestMissingDataError } from '../errors/request-missing-data-error.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { SessionExpiredError } from '../errors/session-expired-error.js';
import {VerifyToken} from '../../../../../utils/verify-token.js'


/*
    INPUT {
        NOT OPTIONAL
        sessionId: someString
    }
*/

export class GetSessionUseCase {
    sessionRepository;
    userRepository;
    constructor(sessionRepository, userRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository
    }

    async execute({
        sessionId
    }) {
        if(!sessionId) {
            return left(new RequestMissingDataError());
        } 

        const {session} = await this.sessionRepository.findById(sessionId)

        if(!session) {
            return left(new ResourceNotFoundError())
        } 

        const isSessionValid = VerifyToken.isTokenValid(session.expiresAt)

        if (!isSessionValid) {
            return left(new SessionExpiredError());
        }

        const {user} = await this.userRepository.findById(session.userId);

        if(!user) {
            return left(new ResourceNotFoundError())
        }

        user.password = null

        return right({
            session,
            user
        })
    }
}