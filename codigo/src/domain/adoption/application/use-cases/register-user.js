import { CPF } from '../../enterprise/entities/value-objects/cpf.js'
import { right, left } from '../../../../../core/Either.js';
import { UserAlredyExistsError } from '../errors/user-already-exists-error.js';
import {User} from '../../enterprise/entities/User.js'
import { UserMissingDataError } from '../errors/user-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        email: string,
        cpf: CPF, 
        password: string,
        name: string, 
        bornAt: Date,
        phoneNumber: string,

        OPTIONAL
        description, 
        img_url,
    }
*/

export class RegisterUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({
        email,
        cpf, 
        password,
        name, 
        bornAt,
        phoneNumber,

        description, 
        img_url,
    }) {
        const userCpfAlredyExists = this.userRepository.findByCpf(CPF.create(cpf));
        const userEmailAlredyExists = this.userRepository.findByEmail(email);

        if(userCpfAlredyExists || userEmailAlredyExists) {
            return left(new UserAlredyExistsError());
        }

        if(!email || !cpf || !name || !bornAt || !phoneNumber) {
            return left(new UserMissingDataError());
        } 

        const user = User.create(
            {
                email,
                cpf, 
                password,
                name, 
                bornAt,
                phoneNumber,
        
                description, 
                img_url,
            }
        )

        await this.userRepository.create(user);

        return right({
            user
        })
    }
}