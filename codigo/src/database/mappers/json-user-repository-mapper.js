import { User } from "../../domain/adoption/enterprise/entities/User.js";

export class JsonUserRepositoryMapper {
    static toDomain(raw) {
        const domainUser = User.create({
            cpf: raw.cpf,
            name: raw.name,
            phoneNumber: raw.phone_number,
            description: raw.description,
            bornAt: raw.born_at,
            imgUrl: raw.img_url,
            email: raw.email,
            passoword: raw.passoword,
            createdAt: raw.created_at,
            updatedAt: raw.updated_at
        }, raw.id)
        
        return domainUser
    }
    static toJson(user) {

        console.log("domain: ",user)
        const jsonUser =  {
            "id": user.id,
            "cpf": user.cpf.value,
            "phone_number": user.phoneNumber,
            "name": user.name,
            "description": user.description,
            "born_at": user.bornAt,
            "img_url": user.imgUrl,
            "email": user.email,
            "password": user.passoword,
            "created_at": user.createdAt,
            "updated_at": user.updatedAt,
        }

        console.log("db: ",jsonUser)


        return jsonUser
    }
}