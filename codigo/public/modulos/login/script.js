import { SessionInterface } from '../../db-interface/session-interface.js'

const sessionInterface = new SessionInterface()

async function authenticate({email, password}) {
    let goodRequest = false;
  
    try{
    const response = await sessionInterface.authenticate({email, password})

    goodRequest = response.isRight()

  }catch(error) {
    console.error(error)
  } finally {
    if(goodRequest) {
        window.location.href = window.location.origin + '/modulos/homepage/homepage.html';
    }
  }

}

async function handleSubmit() {
    const formValues = {          
        email: $("#email").val(),
        password: $("#password").val(),
    }
    try{
      $('#btn-form').addClass('loading');
      await authenticate(formValues)
    }catch(error) {
        console.error(error)
    } finally{
      $('#btn-form').removeClass('loading');
    }
}


$("form").on("submit", async function (event) {
    event.preventDefault(); 
    await handleSubmit()
});

