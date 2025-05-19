import { right } from '../../../../../core/Either.js';

/*
    OUTPUT: {
        tip: TIP
    }
*/

export class FetchTipUseCase {
    tipRepository;
    constructor(tipRepository) {
        this.tipRepository = tipRepository;
    }

    async execute() {
        const tips = await this.tipRepository.findManyTips()

        return right({
            tips
        })
    }
}