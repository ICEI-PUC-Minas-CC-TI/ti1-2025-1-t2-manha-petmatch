# DB EXAMPLE

- This is an db.json example..s

```json
{
  "pet": [
    {
      "id": "someId",
      "name": "Sonolento",
      "animal_type_id": "someId",
      "size": "médio",
      "animal_sex": "macho",
      "description": "Muito pimposo",
      "img_urls": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUl9lJf2W1UHVouB9EdCsbS8NeBBGmyZpjiQ&s"],
      "born_at": "Thu Apr 17 2025 21:20:23 GMT-0300 (Horário Padrão de Brasília)",
      "breed": "Vira-lata caramelo", 
      "vaccinated": true,
      "castrated": true,
      "available_for_adoption": true,
      "personality": ["carinhoso", "preguiçoso", "brincalhão"],

      "current_owner_id": "someId",

      "created_at": "someDate",
      "updated_at": "someDate",

      "donor_user_id": "someId",
      "donor_enterprise": null,

      "current_adopter_id": null
    }
  ], 

  "animal_type": [
    {
        "id": "someId",
        "type": "Cachorro",
        "img_url_reference": "someUrl",
        "created_at": "someDate"
    }
  ],

  "star_rate": [
    {
      "id": "someId",
      "appraiser_id": "someId",
      "rated_entity_id": "someId",
      "rate": 5,
      
      "created_at": "someDate",
      "updated_at": "someDate"
    }
  ], 

  "favoritePet": {
    "id": "someId",

    "appraiser_id": "someId",
    "pet_id": "someId",
    "value": true,

    "created_at": "someDate",
    "updated_at": "someDate"
  },

  "address": [{
    "id": "someId",
    "entity_type": "pet / user / enterprise",
    "entity_id": "someId",

    "street": "Flower Street",
    "number": "123",
    "complement": "Apartment 45",
    "neighborhood": "Spring Garden",
    "city": "Belo Horizonte",
    "state": "MG",
    "zipCode": "30123-456",
    "country": "Brazil",

    "latitude": -19.9245,
    "longitude": -43.9352,

    "created_at": "someDate",
    "updated_at": "someDate"
  }],

  "user": [{
    "id": "uuid",
    "cpf": "12312312312",
    "phone_number": "553340028922", 
    "name": "Ricardão",
    "description": "Meu nome é rircadão",
    "born_at": "Thu Apr 17 2025 21:20:23 GMT-0300 (Horário Padrão de Brasília)",

    "img_url": "someoneUrl",

    "email": "someone@gmail.com",
    "password": "somePassword",

    "created_at": "someDate",
    "updated_at": "someDate"
  }],

  "donor": [
    {
      "id": "someId",
      "donor_type": "enterprise / user",
      "donor_id": "someId",

      "adoption_amount": 0,

      "created_at": "someDate",
      "updated_at": "someDate"
    }
  ],

  "adoption": [
    {
      "id": "someId",
      "user_id": "someId",
      "donor_id": "someId",
      "pet_id": "someId",
      "created_at": "someDate"
    }
  ],

  "enterprise": [
    {
      "id": "uuid",
      "cnpj": "12312312312",
      "phone_number": "553340028922",

      "name": "Petshop do Ricardão",
      "description": "PetShop do ricardão",
      "founded_at": "Thu Apr 17 2025 21:20:23 GMT-0300 (Horário Padrão de Brasília)",
      "img_url": "someoneUrl",

      "email": "someone@gmail.com",
      "password": "somePassword",

      "created_at": "someDate",
      "updated_at": "someDate"
    }
  ],

  "adopter_history": [
    {
      "id": "uuid",
      "adopter_id": "uuid",
      "action": "adoption",
      "created_at": "someDate"    
    }
  ],

  "donor_history": [
    {
      "id": "uuid",
      "donor_id": "uuid",
      "action": "adoption",
      "created_at": "someDate"    
    }
  ],

  "message_session": [
    {
      "id": "someId",
      "adopter_id": "someAdopterId",
      "donor_id": "someDonorId",
      "created_at": "someDate"
    }
  ],

  "message": [
  {
    "id": "someId",
    "from_id": "someId", 
    "to_id": "someId",
    "message_session_id": "someId",
    "type": "text / image / url",
    "content": "someContent / url",
    "created_at": "someDate",
    "updated_at": "someDate"
  }
  ],

  "notification": [{
    "id": "someId",
    "user_id": "someId",
    "type": "content / approved / refused",
    "title": "Titulo da notificação",
    "content": "Conteudo da notificação",

    "created_at": "someDate",
    "updated_at": "someDate"
  }], 

  "tip": [
    {
      "id": "someId",
      "title": "Titiulo da dica",
      "type": "Pet / Pessoa",
      "animal_category_id": "someString",
      "content": "Conteudo",
      "img_url": "someurl",
      "created_at": "someDate"
    }
  ]
}
```