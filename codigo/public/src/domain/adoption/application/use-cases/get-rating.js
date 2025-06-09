import { RequestMissingDataError } from "../errors/request-missing-data-error";

export class GetRatingUserUseCase {
    ratingUserRepository;
    constructor( ratingUserRepository) { //classes já instânciadas
        this.ratingUserRepository = ratingUserRepository;
   
    }
    
    async execute({
           id
        }) {
    
            if( !id ) {
                return left(new RequestMissingDataError());
            } 
            
            const ratingUser = await this.ratingUserRepository.findById(id)
            return right({
            ratingUser
            })
        }
    }
