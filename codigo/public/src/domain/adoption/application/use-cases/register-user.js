import { CPF } from '../../enterprise/entities/value-objects/cpf.js'
import { right, left } from '../../../../../core/Either.js';
import { UserAlredyExistsError } from '../errors/user-already-exists-error.js';
import {User} from '../../enterprise/entities/User.js'
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


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

        if(!email || !cpf || !name || !bornAt || !phoneNumber) {
            return left(new RequestMissingDataError());
        } 

        const userCpf = CPF.create(cpf)

        const userCpfAlredyExists = await this.userRepository.findByCpf(userCpf.value);
        const userEmailAlredyExists = await this.userRepository.findByEmail(email);

        if(userCpfAlredyExists.user || userEmailAlredyExists.user) {
            return left(new UserAlredyExistsError());
        }


        const user = User.create(
            {
                email,
                cpf: userCpf, 
                password,
                name, 
                bornAt,
                phoneNumber,
                imgUrl: null,
                
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