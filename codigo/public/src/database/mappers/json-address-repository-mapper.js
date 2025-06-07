import {Address} from '../../domain/adoption/enterprise/entities/Address.js'

export class JsonAddressRepositoryMapper {
    static toDomain(raw) {
        const address = Address.create({
                entityId: raw.entity_id,
                street: raw.street,
                number: raw.number,
                complement: raw.complement,
                neighborhood: raw.neighborhood,
                city: raw.city,
                state: raw.state,
                zipCode: raw.zipCode,
                country: raw.country,
                latitude: raw.latitude,
                longitude: raw.longitude,
                entityType: raw.entity_type,
                createdAt: raw.created_at,
                updatedAt: raw.updated_at
        }, raw.id)

        return address
    }

    static toJson(address) {
        const jsonAddress = {
            id: address.id,
            entity_type:address.entityType,
            entity_id: address.entityId,
            street: address.street,
            number: address.number,
            complement: address.complement,
            neighborhood: address.neighborhood,
            city:address.city,
            state: address.state,
            zipCode:address.zipCode,
            country: address.country,
            latitude:address.latitude,
            longitude: address.longitude,
            created_at: address.createdAt,
            updated_at: address.updatedAt,
        }
        return jsonAddress
    }
}