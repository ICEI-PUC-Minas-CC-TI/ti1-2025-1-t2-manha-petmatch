import { User } from "../../domain/adoption/enterprise/entities/User.js";
import {VerifyImage} from '../../../utils/verify-image.js'
import { CPF } from "../../domain/adoption/enterprise/entities/value-objects/cpf.js";
export class JsonUserRepositoryMapper {
    static async toDomain(raw) {
        const image = await VerifyImage.doesImageExists(raw.img_url, (doesExists) => {
                return doesExists ? raw.img_url : "../../Images/someone.jpg"
            })

        const domainUser = User.create({
            cpf: CPF.create(raw.cpf),
            name: raw.name,
            phoneNumber: raw.phone_number,
            description: raw.description,
            bornAt: raw.born_at,
            imgUrl: image,
            email: raw.email,
            password: raw.password,
            createdAt: raw.created_at,
            updatedAt: raw.updated_at
        }, raw.id)
        
        return domainUser
    }
    static toJson(user) {

        const jsonUser =  {
            "id": user.id,
            "cpf": user.cpf.value,
            "phone_number": user.phoneNumber,
            "name": user.name,
            "description": user.description,
            "born_at": user.bornAt,
            "img_url": user.imgUrl,
            "email": user.email,
            "password": user.password,
            "created_at": user.createdAt,
            "updated_at": user.updatedAt,
        }
        
        return jsonUser
    }
}