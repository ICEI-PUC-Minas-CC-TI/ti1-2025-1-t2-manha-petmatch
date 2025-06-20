import { left, right } from "../../../../../core/Either.js";
import { ResourceNotFoundError } from "../../../../../core/errors/resource-not-found-error.js";
import { RequestMissingDataError } from "../errors/request-missing-data-error.js";
import {NotAllowedError} from '../../../../../core/errors/not-allowed-error.js'
import { Session } from "../../enterprise/entities/Session.js";

export class AuthenticateUseCase {
    sessionRepository;
    userRepository;
    donorRepository;
    
    constructor(sessionRepository, userRepository, donorRepository) {
        this.sessionRepository = sessionRepository
        this.userRepository = userRepository
        this.donorRepository = donorRepository
    }

    async execute({
        email,
        password
    }) {
        if(!email || !password) {
            return left(new RequestMissingDataError())
        }

        const {user} = await this.userRepository.findByEmail(email);

        if(!user) {
            return left(new ResourceNotFoundError())
        }


        if(user.props.password !== password) {
            return left(new NotAllowedError())
        } 

        const {donor} = await this.donorRepository.findByUserId(user.id)

        const sessionTime = 3 * 24 * 60 * 60 * 1000 // 3 days
        const now = new Date()
        const expiresDate = new Date(now.getTime() + sessionTime)
        let session

        if(donor) {
            session = Session.create({
                userId: user.id,
                donorId: donor.id,
                expiresAt: expiresDate.toISOString(),
                entityType: 'DONOR'
            })
        } else {
            session = Session.create({
                userId: user.id,
                donorId: null,
                expiresAt: expiresDate.toISOString(),
                entityType: 'USER'
            })
        } 

        await this.sessionRepository.create(session)

        return right({session})
    }
}