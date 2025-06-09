import { RatingUserRepositoryMapper } from './json-rating-user-repository-mapper.js';

export class JsonRatingUserRepository {
    url = `${window.location.origin}/profile_rating`;

    constructor() {}

    async create(ratingUser) {
        try {
            const dbRatingUser = RatingUserRepositoryMapper.toJson(ratingUser);

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbRatingUser),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (err) {
            console.error("Erro ao criar avaliação:", err);
        }
    }

   async findByPetId(petId) {
        try {
            const newUrl = `${this.url}?pet_id=${petId}`;
            const response = await fetch(newUrl);
            const jsonFormat = await response.json();

            return jsonFormat.length === 0
                ? null
                : { ratingUser: RatingUserRepositoryMapper.toDomain(jsonFormat[0]) };
        } catch (err) {
            console.error("Erro ao buscar avaliação por petId:", err);
        }
    }

    async findByDonorId(donorId) {
        try {
            const newUrl = `${this.url}?donor_id=${donorId}`;
            const response = await fetch(newUrl);
            const jsonFormat = await response.json();

            return { ratingUser:jsonFormat.map((avaliacao) =>{
            return RatingUserRepositoryMapper.toDomain(avaliacao);
        }) };
        } catch (err) {
            console.error("Erro ao buscar avaliação por donorId:", err);
        }
    }

    async findById(id) {
        try {
            const newUrl = `${this.url}/${id}`;
            const response = await fetch(newUrl);
            const jsonFormat = await response.json();

            return Object.keys(jsonFormat).length === 0
                ? { ratingUser: null }
                : { ratingUser: RatingUserRepositoryMapper.toDomain(jsonFormat) };
        } catch (err) {
            console.error("Erro ao buscar avaliação por ID:", err);
        }
    }

    async delete(ratingUser) {
        try {
            const newUrl = `${this.url}/${ratingUser.id}`;
            await fetch(newUrl, {
                method: "DELETE"
            });
        } catch (err) {
            console.error("Erro ao deletar avaliação:", err);
        }
    }
}
