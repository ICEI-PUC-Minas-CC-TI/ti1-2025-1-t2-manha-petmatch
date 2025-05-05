import {JsonTipRepository} from '../src/database/repositories/adoption/json-tip-repository.js'
import { FetchTipUseCase } from '../src/domain/adoption/application/use-cases/fetch-tip.js'
import { GetTipUseCase } from '../src/domain/adoption/application/use-cases/get-tip.js'


export class TipInterface {
    tipRepository = new JsonTipRepository()
 
    /*
        OUTPUT {
            tip: Tip[]
        }
    */

    async fetchTip() {
        const fetchTipUseCase = new FetchTipUseCase(this.tipRepository)

        const response = await fetchTipUseCase.execute();

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }

        /*
        INPUT {
            id: string
        }
        OUTPUT {
            tip: Tip
        }
        */

    async getTip({id}) {
        const fetTipUseCase = new GetTipUseCase(this.tipRepository)

        const response = await fetTipUseCase.execute({
            id
        });

        if(response.isLeft() === true) {
            console.error(response);
            return response;
        }

        return response.value;
    }
}