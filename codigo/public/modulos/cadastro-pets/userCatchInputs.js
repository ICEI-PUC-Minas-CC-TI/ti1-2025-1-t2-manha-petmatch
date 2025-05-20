import { PetInterface } from '../../db-interface/pet-interface.js';

const petService = new PetInterface();

async function petRegister(params) {
  try {
    console.log("Enviando para registerPetInterface:", params); // log de depuração
    const registerPetInterface = await petService.registerPetInterface(params);
    return registerPetInterface;
  } catch (error) {
    console.error("Erro na interface de registro:", error);
  }
}

document.querySelector('.submit').addEventListener('click', async () => {
  try {
    // Imagens (base64)
    const inputImagens = document.getElementById('file-button');
    const arquivos = Array.from(inputImagens?.files || []);
    const imagens = await Promise.all(
      arquivos.map(arquivo => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(arquivo);
        });
      })
    );

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

    const petInfo = {
      name: nome,
      description: descricao,
      animalTypeId: classificacao,
      size: tamanho,
      breed: [breed],
      vaccinated: vacinado,
      castrated: castrado,
      personality: [],
      imgUrls: imagens,
      bornAt: dataEncontro,
      donorId: "donorTestId",
      availableForAdoption: true,
      animalSex: "Male",
    };

    console.log("===== Console: petInfo =====");
    console.log("Nome:", nome);
    console.log("Descrição:", descricao);
    console.log("Classificação:", classificacao);
    console.log("Vacinado:", vacinado);
    console.log("Vacinas:", vacinas);
    console.log("Data de Encontro:", dataEncontro);
    console.log("Tamanho:", tamanho);
    console.log("Raça:", breed);
    console.log("Castrado:", castrado);
    console.log("Foi ao Veterinário:", foiVeterinario);
    console.log("Descrição da consulta:", consultaDescricao);
    console.log("Imagens (base64):", imagens);
    console.log("Endereço:", {
      estado,
      cep,
      cidade,
      complemento,
      rua,
      bairro
    });

    const resultado = await petRegister({ petInfo });


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
