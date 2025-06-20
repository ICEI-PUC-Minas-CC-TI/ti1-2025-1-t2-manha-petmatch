import { UserInterface } from '../../db-interface/user-interface.js';
import { DonorInterface } from '../../db-interface/donor-interface.js';
import { SessionInterface } from '../../db-interface/session-interface.js';

const notyf = new Notyf({
  duration: 2000,
  riple: true,
  position: { x: 'left', y: 'top' },
});

const userInterface = new UserInterface();
const donorInterface = new DonorInterface();
const sessionInterface = new SessionInterface();

async function authenticate({ email, password }) {
  let requestData = { status: false, message: "Bad request" };

  try {
    const response = await sessionInterface.authenticate({ email, password });
    requestData.status = response.isRight();

    if (response.isLeft()) {
      requestData.message = response.value.message;
    }
  } catch (error) {
    console.error("4", error);
  } finally {
    if (requestData.status) {
      window.location.href = `${window.location.origin}/modulos/homepage/homepage.html`;
    } else {
      notyf.error(requestData.message);
    }
  }
}

async function registerEntity({ interfaceInstance, formValues }) {
  let requestData = { status: false, message: "Bad request" };

  try {
    const response = await interfaceInstance.registerUser
      ? await interfaceInstance.registerUser({
          userData: formValues.register,
          address: formValues.address,
        })
      : await interfaceInstance.registerDonor({
          userData: formValues.register,
          address: formValues.address,
        });

    requestData.status = response.isRight();

    if (response.isLeft()) {
      requestData.message = response.value.message;
    }

  } catch (error) {
    console.error(error);
  } finally {
    if (!requestData.status) {
      notyf.error(requestData.message);
    } else {
       await authenticate({
        email: formValues.register.email,
        password: formValues.register.password,
    });
    }
  }
}

function getFormValues() {
  return {
    register: {
      name: $("#name").val(),
      cpf: $("#cpf").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      bornAt: $("#birthdate").val(),
      phoneNumber: $("#phone").val(),
    },
    address: {
      street: $("#street").val(),
      number: $("#number").val(),
      complement: $("#complement").val(),
      neighborhood: $("#neighborhood").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      zipCode: $("#cep").val(),
    },
  };
}

async function handleSubmit() {
  const formValues = getFormValues();
  const registerType = $("input[name='role']:checked").val();

  try {
    $('#btn-form').addClass('loading').prop('disabled', true);

    switch (registerType) {
      case 'USER':
        await registerEntity({ interfaceInstance: userInterface, formValues });
        break;
      case 'DONOR':
        await registerEntity({ interfaceInstance: donorInterface, formValues });
        break;
      default:
        throw new Error("Need to specify USER or DONOR");
    }
  } catch (error) {
    console.error(error);
  } finally {
    $('#btn-form').removeClass('loading').prop('disabled', false);
  }
}

$("form").on("submit", async function (event) {
  event.preventDefault();
  await handleSubmit();
});
