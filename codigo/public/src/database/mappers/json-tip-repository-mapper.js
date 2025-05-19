import { Tip } from "../../domain/adoption/enterprise/entities/Tip.js";

export class JsonTipRepositoryMapper {
    static toDomain(raw) {
        const domainTip = Tip.create({
                createdAt: raw.created_at,
                animalTypeId: raw.animal_type_id,
                imgUrl: raw.img_url,
                tips: raw.tips,
        }, raw.id)
        
        return domainTip
    }
    static toJson(tip) {

        const jsonTip =  {
           created_at: tip.createdAt ,
           animal_type_id: tip.animalTypeId ,
           img_url: tip.imgUrl ,
           tips: tip.tips ,
           id: tip.id,
        }

        return jsonTip
    }
}