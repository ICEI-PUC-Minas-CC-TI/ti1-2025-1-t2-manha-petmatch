export class CloudinaryService {
    // Eu sei que é uma prática ruim colocar no código uma informação que não deve ser disponibilizada para todo mundo.
    api_base_url = 'https://api.cloudinary.com/v1_1/dth1lxikr/upload'
    constructor() {}

    async upload({  
        file,
        entityId,
    }) {
        try {
            const formData = new FormData();
            const newName = `petmatch_cloudinary_${entityId}`

            formData.append('file', file);
            formData.append('upload_preset', 'petmatch_preset');
            formData.append('public_id', newName);

            const response = await fetch(this.api_base_url, {
            method: 'POST',
            body: formData,
            })

            const object = await response.json()

            return {
                url: object.secure_url
            }
        }catch(error) {
            console.error(error)
        }
    }
}