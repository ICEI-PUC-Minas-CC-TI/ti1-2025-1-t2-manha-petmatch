// ✅ json-animal-type-repository.js
import { JsonAnimalTypeRepositoryMapper } from "../../mappers/json-animal-type-repository-mapper.js";

export class JsonAnimalTypeRepository {
    url = `${window.location.origin}/animal_type`;


    constructor() { }

    async create(animaltype) {
        try {
            const dbAnimalType = JsonAnimalTypeRepositoryMapper.toJson(animaltype);

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbAnimalType),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (err) {
            console.error(err);
        }
    }

    async findById(id) {
        try {
            const newUrl = `${this.url}/${id}`;
            const response = await fetch(newUrl);
            const jsonFormat = await response.json();

            const animaltype =
                Object.keys(jsonFormat).length === 0
                    ? { animalType: null }
                    : {
                        animalType: JsonAnimalTypeRepositoryMapper.toDomain(jsonFormat),
                    };

            return animaltype;
        } catch (err) {
            console.error(err);
        }
    }

    async findManyAnimalTypes() {
        try {
            const newUrl = `${this.url}/`;
            const response = await fetch(newUrl);
            const jsonFormat = await response.json();

            const animaltypes = jsonFormat.map((element) => {
                return { ...JsonAnimalTypeRepositoryMapper.toDomain(element) };
            });

            return animaltypes;
        } catch (err) {
            console.error(err);
        }
    }

    async save(animaltype) {
        try {
            const newUrl = `${this.url}/${animaltype.id}`;
            const dbAnimalType = JsonAnimalTypeRepositoryMapper.toJson(animaltype);

            await fetch(newUrl, {
                method: "PUT",
                body: JSON.stringify(dbAnimalType),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (err) {
            console.error(err);
        }
    }

    async delete(animaltype) {
        try {
            const newUrl = `${this.url}/${animaltype.id}`;

            await fetch(newUrl, {
                method: "DELETE",
            });
        } catch (err) {
            console.error(err);
        }
    }
}
