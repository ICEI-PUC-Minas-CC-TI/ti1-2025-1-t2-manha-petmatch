import { right, left } from '../../../../../core/Either.js';
import { ResourceNotFoundError } from '../../../../../core/errors/resource-not-found-error.js';
import { RequestMissingDataError } from '../errors/request-missing-data-error.js';


/*
    INPUT {
        NOT OPTIONAL
        Id: string
    }

    OUTPUT: {
        tip: TIP
    }
*/

export class GetTipUseCase {
    tipRepository;
    constructor(tipRepository) {
        this.tipRepository = tipRepository;
    }

    async execute({
       id
    }) {

        if( !id ) {
            return left(new RequestMissingDataError());
        } 

        const tip = await this.tipRepository.findById(id)

        if(!tip) {
            return left(new ResourceNotFoundError())
        }

        return right({
            tip
        })
    }
}