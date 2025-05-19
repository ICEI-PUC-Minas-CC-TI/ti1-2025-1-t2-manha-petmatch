<<<<<<< HEAD
// ✅ json-animal-type-repository.js
import { JsonAnimalTypeRepositoryMapper } from "../../mappers/json-animal-type-repository-mapper.js";

export class JsonAnimalTypeRepository {
    url = `http://localhost:3000/animal_type`;


    constructor() { }

    async create(animaltype) {
        try {
            const dbAnimalType = JsonAnimalTypeRepositoryMapper.toJson(animaltype);
=======
import { JsonAnimalTypeRepositoryMapper } from "../../mappers/json-animal-type-repository-mapper.js";

export class JsonAnimalTypeRepository {
    url=`${window.location.origin}/animal_type`;

    constructor() {}

    async create(animaltype) {
        try {
            const dbAnimalType = JsonAnimalTypeRepositoryMapper.toJson(animaltype)
>>>>>>> ff42be3 (add funcionalidade favoritar e voltar as pastas ao normal)

            await fetch(this.url, {
                method: "POST",
                body: JSON.stringify(dbAnimalType),
                headers: {
<<<<<<< HEAD
                    "Content-Type": "application/json",
                },
            });
        } catch (err) {
            console.error(err);
=======
                    "Content-Type": "application/json"
                },        
            })
        } catch(err) {
            console.err(err)
>>>>>>> ff42be3 (add funcionalidade favoritar e voltar as pastas ao normal)
        }
    }

    async findById(id) {
<<<<<<< HEAD
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
=======
        try{
            const newUrl = `${this.url}/${id}`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const animaltype = Object.keys(jsonFormat).length === 0 ? {animalType: null} : {animalType: JsonAnimalTypeRepositoryMapper.toDomain(jsonFormat)}

            return animaltype
        } catch(err) {
>>>>>>> ff42be3 (add funcionalidade favoritar e voltar as pastas ao normal)
            console.error(err);
        }
    }

    async findManyAnimalTypes() {
<<<<<<< HEAD
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
=======
        try{
            const newUrl = `${this.url}/`

            const response = await fetch(newUrl);

            const jsonFormat = await response.json()

            const animaltype = jsonFormat.map((element) => {
                return  {...JsonAnimalTypeRepositoryMapper.toDomain(element)}
            })

            return animaltype
        } catch(err) {
            console.error(err);
        }
    }
    
    async save(animaltype) {
    try {
        const newUrl = `${this.url}/${animaltype.id}`

        const dbAnimalType = JsonAnimalTypeRepositoryMapper.toJson(animaltype)
>>>>>>> ff42be3 (add funcionalidade favoritar e voltar as pastas ao normal)

            await fetch(newUrl, {
                method: "PUT",
                body: JSON.stringify(dbAnimalType),
                headers: {
<<<<<<< HEAD
                    "Content-Type": "application/json",
                },
            });
        } catch (err) {
            console.error(err);
        }
=======
                    "Content-Type": "application/json"
                },        
            })
    } catch (err) {
        console.error(err)
    }
>>>>>>> ff42be3 (add funcionalidade favoritar e voltar as pastas ao normal)
    }

    async delete(animaltype) {
        try {
<<<<<<< HEAD
            const newUrl = `${this.url}/${animaltype.id}`;

            await fetch(newUrl, {
                method: "DELETE",
            });
        } catch (err) {
            console.error(err);
        }
    }
}
=======
            const newUrl = `${this.url}/${animaltype.id}`

            await fetch(newUrl, {
                method: "DELETE"
            })
        } catch(err) {
            console.err(err)
        }
    }
}
>>>>>>> ff42be3 (add funcionalidade favoritar e voltar as pastas ao normal)
