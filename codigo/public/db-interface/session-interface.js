import {JsonSessionRepository} from '../src/database/repositories/adoption/json-session-repository.js'
import {JsonDonorRepository} from '../src/database/repositories/adoption/json-donor-repository.js'
import {JsonUserRepository} from '../src/database/repositories/adoption/json-user-repository.js'
import {JsonAddressRepository} from '../src/database/repositories/adoption/json-address-repository.js'
import {AuthenticateUseCase} from '../src/domain/adoption/application/use-cases/authenticate.js'
import { GetSessionUseCase } from '../src/domain/adoption/application/use-cases/get-session.js'

export class SessionInterface {
    addressRepository = new JsonAddressRepository();
    sessionRepository = new JsonSessionRepository(this.addressRepository)
    donorRepository = new JsonDonorRepository();
    userRepository = new JsonUserRepository();

    /*
    INPUT {
        NOT OPTIONAL
        email: string
        password: string
    }
    OUTPUT {
        session: Session
    }
    */

    async authenticate({email, password}) {
        const authenticateUseCase = new AuthenticateUseCase(this.sessionRepository, this.userRepository, this.donorRepository)

        const response = await authenticateUseCase.execute({email, password})

         if(response.isLeft() === true) {
                console.error(response);
                return response;
            }
        
        localStorage.setItem('session', JSON.stringify(response.value));

        return response;
    }

    logOut() {
        localStorage.removeItem('session');
        window.location.href = window.location.origin + '/modulos/login/index.html';
    }

    async getSession({sessionId}) {
            const getSessionUseCase = new GetSessionUseCase(this.sessionRepository)

            const response = await getSessionUseCase.execute({sessionId})

            if(response.isLeft() === true) {
                    console.error(response);
                    return response;
            }

            localStorage.setItem('session', JSON.stringify(response.value));
            
            return response;
    }
}