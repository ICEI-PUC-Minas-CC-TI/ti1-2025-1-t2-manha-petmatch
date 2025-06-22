import { PetInterface } from '../../db-interface/pet-interface.js';

const petService = new PetInterface();

document.querySelector('.submit').addEventListener('click', async (event) => {
  event.preventDefault();

  const nomePet = document.querySelector('.adicionar-nome-e-imagem input[type="text"]').value;
  const descricaoPet = document.querySelector('.campo-de-digitar input[type="text"]').value;
  const classificacaoSelect = document.getElementById('classificacao');
  const classificacaoId = classificacaoSelect.value;
  // const classificacaoNome = classificacaoSelect.options[classificacaoSelect.selectedIndex].text; // Se precisar do nome

  const vacinadoToggle = document.querySelector('#vacina-toggle .toggle-btn.active')?.textContent === 'Sim';
  const tamanho = document.querySelector('#tamanho-toggle .toggle-btn.active')?.textContent;
  const castradoToggle = document.querySelector('#castrado-toggle .toggle-btn.active')?.textContent === 'Sim';
  const veterinarioToggle = document.querySelector('#veterinario-toggle .toggle-btn.active')?.textContent === 'Sim';

  const vacinaInputs = document.querySelectorAll('#lista-de-vacinas .vacina-item input.campo-de-digitar');
  const vacinas = vacinadoToggle ? Array.from(vacinaInputs).map(input => input.value.trim()).filter(v => v) : [];
  const primeiraVacinaInput = document.querySelector('#campos-vacina input.campo-de-digitar');
  if (vacinadoToggle && primeiraVacinaInput && primeiraVacinaInput.value.trim() !== '' && !vacinas.includes(primeiraVacinaInput.value.trim())) {
    vacinas.unshift(primeiraVacinaInput.value.trim());
  }

  const dataEncontro = document.querySelector('.form-group-horizontal input[type="text"]').value;
  const raca = document.querySelector('.info-card input[placeholder="Shitsu, British Shorthair, Vira-Lata..."]').value;
  const consultaVeterinario = veterinarioToggle ? document.querySelector('#campo-consulta input[type="text"]').value : '';

  const estado = document.querySelector('.info-card input[placeholder="Minas Gerais, Bahia..."]').value;
  const cep = document.querySelector('.info-card input[placeholder="Ex: 12.345-000..."]').value;
  const cidade = document.querySelector('.info-card input[placeholder="Belo Horizonte, São Paulo..."]').value;
  const complemento = document.querySelector('.info-card input[placeholder="Casa, apartamento..."]').value;
  const rua = document.querySelector('.info-card input[placeholder="Rua São João..."]').value;
  const bairro = document.querySelector('.info-card input[placeholder="Lourdes..."]').value;

  const inputImagens = document.getElementById('file-button');
  const arquivos = Array.from(inputImagens?.files || []);
  const imagensBase64 = await Promise.all(
    arquivos.map(arquivo => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(arquivo);
      });
    })
  );

  // O donorId precisa vir de algum lugar (sessão do usuário logado, por exemplo)
  // Por enquanto, vamos usar um valor fixo ou um placeholder para testes.
  // Em um sistema real, isso viria da autenticação do usuário.
  const donorId = "some-predefined-donor-id"; // <-- Mude isso para o ID real do doador/usuário logado

  const petInfo = {
    name: nomePet,
    animalTypeId: classificacaoId, // Usamos o ID da classificação
    size: tamanho,
    // animalSex: "", // Não vi campo para sexo no seu HTML, adicione se precisar
    descriptions: descricaoPet,
    imgUrls: imagensBase64,
    // bornAt: new Date(), // Ajuste conforme a data de nascimento real do pet
    breed: [raca], // Assumindo que raça é um array de strings
    vaccinated: vacinadoToggle,
    castrated: castradoToggle,
    availableForAdoption: true, // Ou baseie em um campo no HTML
    personality: [], // Adicione campo para personalidade se precisar
    donorId: donorId,
    // Adicione as informações de endereço aqui, conforme a estrutura esperada pela sua `RegisterPetUseCase`
    address: { // Supondo que a estrutura do endereço seja assim na sua PetInterface/Backend
      state: estado,
      zipCode: cep,
      city: cidade,
      complement: complemento,
      street: rua,
      neighborhood: bairro
    },
    hasVeterinaryConsultation: veterinarioToggle,
    veterinaryConsultationDescription: consultaVeterinario,
    vaccines: vacinas
  };

  try {
    const response = await petService.registerPetInterface({ petInfo });

    if (response && response.isLeft && response.isLeft()) {
      console.error("Erro ao cadastrar pet:", response.value);
      alert('Erro ao cadastrar pet: ' + response.value.message || 'Erro desconhecido.');
    } else {
      alert('Pet cadastrado com sucesso!');
      document.querySelector('form').reset();
      // Você pode redirecionar ou atualizar a lista de pets após o cadastro
    }
  } catch (error) {
    console.error("Erro inesperado ao registrar pet:", error);
    alert('Ocorreu um erro ao cadastrar o pet. Verifique o console.');
  }
});