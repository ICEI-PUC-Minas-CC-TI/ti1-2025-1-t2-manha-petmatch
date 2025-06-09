import { AddressInterface } from "../../address-interface.js";

window.addEventListener("DOMContentLoaded", () => {
  const addressManager = new AddressInterface();
  const result = document.getElementById("result");

  // 🟩 Valores do formulário de CADASTRO
  const getFormValues = () => ({
    entityId: document.getElementById("entityId").value,
    donorId: document.getElementById("donorId").value,
    street: document.getElementById("street").value,
    number: document.getElementById("number").value,
    complement: document.getElementById("complement").value,
    neighborhood: document.getElementById("neighborhood").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    zipCode: document.getElementById("zipCode").value,
    country: document.getElementById("country").value,
  });

  // 🟦 Valores do formulário de EDIÇÃO
  const getEditFormValues = () => ({
    addressId: document.getElementById("editAddressId").value,
    donorId: document.getElementById("editDonorId").value,
    street: document.getElementById("editStreet").value,
    number: document.getElementById("editNumber").value,
    complement: document.getElementById("editComplement").value,
    neighborhood: document.getElementById("editNeighborhood").value,
    city: document.getElementById("editCity").value,
    state: document.getElementById("editState").value,
    zipCode: document.getElementById("editZipCode").value,
    country: document.getElementById("editCountry").value,
  });

  function display(resultData) {
    result.innerHTML = JSON.stringify(resultData, null, 2);
  }

  function handleError(error) {
    console.error(error);
    result.innerHTML = "Erro ao executar operação.";
  }

  // 📌 Cadastrar endereço
  document.getElementById("registerAddressButton").addEventListener("click", async () => {
    try {
      const props = getFormValues();
      const res = await addressManager.registerPetAddress(props);
      display(res);
    } catch (e) {
      handleError(e);
    }
  });

  // ✏️ Editar endereço
  document.getElementById("editAddressButton").addEventListener("click", async () => {
    try {
      const props = getEditFormValues();
      const res = await addressManager.editPetAddress(props);
      display(res);
    } catch (e) {
      handleError(e);
    }
  });

  // 🔍 Buscar endereço por ID
  document.getElementById("getAddressButton").addEventListener("click", async () => {
    try {
      const id = document.getElementById("getAddressId").value;
      const res = await addressManager.getPetAddress({ id });
      display(res);
    } catch (e) {
      handleError(e);
    }
  });

  // 🔎 Buscar endereço por ID do pet
  document.getElementById("getByPetButton").addEventListener("click", async () => {
    try {
      const petId = document.getElementById("getPetId").value;
      const res = await addressManager.getPetAddressByPet({ petId });
      display(res);
    } catch (e) {
      handleError(e);
    }
  });

  // 📥 Buscar todos os endereços
  document.getElementById("fetchAllButton").addEventListener("click", async () => {
    try {
      const res = await addressManager.fetchPetsAddresses();
      display(res);
    } catch (e) {
      handleError(e);
    }
  });

  // 🗑️ Excluir endereço
  document.getElementById("deleteButton").addEventListener("click", async () => {
    try {
      const addressId = document.getElementById("deleteAddressId").value;
      const donorId = document.getElementById("deleteDonorId").value;
      const res = await addressManager.deletePetAddress({ addressId, donorId });
      display(res);
    } catch (e) {
      handleError(e);
    }
  });
});
