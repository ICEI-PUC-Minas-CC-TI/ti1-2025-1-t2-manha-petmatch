import { AddressInterface } from "../../address-interface.js";

const addressManager = new AddressInterface();

const result = document.getElementById("result");

const fields = [
  "entityId", "street", "number", "complement", "neighborhood",
  "city", "state", "zipCode", "country", "latitude", "longitude"
];

const getFormValues = () => {
  const values = {};
  fields.forEach(field => {
    values[field] = document.getElementById(field).value;
  });
  return values;
};

async function registerAddress() {
  try {
    const props = getFormValues();
    const response = await addressManager.registerPetAddress(props);
    result.innerHTML = JSON.stringify(response, null, 2);
  } catch (error) {
    console.error(error);
    result.innerHTML = "Erro ao registrar endereço.";
  }
}

document.getElementById("registerAddressButton").addEventListener("click", registerAddress);
