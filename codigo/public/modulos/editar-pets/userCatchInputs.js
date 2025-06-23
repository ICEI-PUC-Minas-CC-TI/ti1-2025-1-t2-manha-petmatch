import { PetInterface } from '../../db-interface/pet-interface.js';

const searchParams = new URLSearchParams(window.location.search);
const petId = searchParams.get('petId');

const petService = new PetInterface();

async function petEditar(params) {
  try {
    const registerPetInterface = await petService.editPet(params);
    return registerPetInterface;
  } catch (error) {
    console.error("Erro na interface de registro:", error);
  }
}

document.querySelector('.submit').addEventListener('click', async () => {
  try {
    // Imagens (base64)

    const getValue = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.value.trim() : '';
    };

    const getToggle = (selector) => {
      const el = document.querySelector(`${selector} .toggle-btn.active`);
      return el ? el.innerText : '';
    };

    const nome = getValue('.campo-de-digitar-com-a-imagem input');
    const descricao = document.querySelector('input[placeholder="Descrição do PET"]')?.value.trim() || '';

    const classificacao = getValue('#classificacao');
    const vacinado = getToggle('#vacina-toggle') === 'Sim';
    const vacinas = vacinado
      ? [getValue('#campos-vacina input')]
        .concat([...document.querySelectorAll('#lista-de-vacinas input')].map(i => i.value.trim()))
        .filter(v => v !== '')
      : [];

    const dataEncontro = getValue('.form-group-horizontal input[placeholder*="encontrou"]');
    const tamanho = getToggle('#tamanho-toggle');
    const breed = getValue('input[placeholder*="Shitsu"]');
    const castrado = getToggle('#castrado-toggle') === 'Sim';
    const foiVeterinario = getToggle('#veterinario-toggle') === 'Sim';
    const consultaDescricao = foiVeterinario ? getValue('#campo-consulta input') : '';

    const estado = getValue('input[placeholder*="Minas Gerais"]');
    const cep = getValue('input[placeholder*="12.345"]');
    const cidade = getValue('input[placeholder*="Belo Horizonte"]');
    const complemento = getValue('input[placeholder*="Casa, apartamento"]');
    const rua = getValue('input[placeholder*="Rua São João"]');
    const bairro = getValue('input[placeholder*="Lourdes"]');
    const numero = getValue('input[placeholder*="Número"]');

    const petInfo = {
      name: nome,
      descriptions: descricao,
      animalTypeId: classificacao,
      size: tamanho,
      breed: [breed],
      vaccinated: vacinado,
      castrated: castrado,
      personality: [],
      bornAt: dataEncontro,
      donorId: "donorTestId",
      availableForAdoption: true,
      animalSex: "Male",
    };
    const petAddress = {
        street:rua,
        number: numero,
        complement: complemento,
        neighborhood: bairro,
        city: cidade,
        state: estado,
        zipCode: cep,
    }

    const resultado = await petEditar({ petInfo, petAddress, petId });


    if (resultado?.erro) {
      alert('Erro ao registrar pet: ' + resultado.erro);
    } else {
      alert('Pet cadastrado com sucesso!');
    }

  } catch (err) {
    console.error("Erro inesperado:", err);
    alert('Erro inesperado ao cadastrar o pet.');
  }
});
