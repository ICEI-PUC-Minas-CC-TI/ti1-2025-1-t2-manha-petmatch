import {JsonTipRepository} from '../src/database/repositories/adoption/json-tip-repository.js'
import { FetchTipUseCase } from '../src/domain/adoption/application/use-cases/fetch-tip.js'


export class TipInterface {
    tipRepository = new JsonTipRepository()
 

    async fetchTip() {
        const fetchTipUseCase = new FetchTipUseCase(this.tipRepository)

        const response = await fetchTipUseCase.execute();

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }
}