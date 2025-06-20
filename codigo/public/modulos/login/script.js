import { SessionInterface } from '../../db-interface/session-interface.js';

const sessionInterface = new SessionInterface();

const notyf = new Notyf({
  duration: 2000,
  riple: true,
  position: { x: 'left', y: 'top' },
});

async function authenticate({ email, password }) {
  let goodRequest = false;

  try {
    const response = await sessionInterface.authenticate({ email, password });
    goodRequest = response.isRight();
  } catch (error) {
    console.error(error);
  } finally {
    if (goodRequest) {
      window.location.href = `${window.location.origin}/modulos/homepage/homepage.html`;
    } else {
      notyf.error("Email ou senha incorreta.");
    }
  }
}

async function handleSubmit() {
  const formValues = {
    email: $("#email").val(),
    password: $("#password").val(),
  };

  try {
    $('#btn-form').addClass('loading').prop('disabled', true);
    await authenticate(formValues);
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
