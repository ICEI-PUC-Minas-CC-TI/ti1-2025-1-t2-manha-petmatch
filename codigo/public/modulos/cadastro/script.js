import {UserInterface} from '../../db-interface/user-interface.js'
import {DonorInterface} from '../../db-interface/donor-interface.js'
import { SessionInterface } from '../../db-interface/session-interface.js'

const userInterface = new UserInterface()
const donorInterface = new DonorInterface()
const sessionInterface = new SessionInterface()

async function authenticate({email, password}) {
  let goodRequest = false 
  try{
    const response = await sessionInterface.authenticate({email, password})
    goodRequest = response.isRight()
  }catch(error) {
    console.error(error)
  } finally{
    if(goodRequest){
      window.location.href = window.location.origin + '/modulos/homepage/homepage.html';
    }
  }

}

async function registerUser(formValues) {
  try {
    await userInterface.registerUser({
          userData: formValues.register,
          address: formValues.address
    })

    await authenticate({
      email: formValues.register.email,
      password: formValues.register.password
    })
  } catch(error) {
    console.error(error)
  }
}

async function registerDornor(formValues) {
  try {
    await donorInterface.registerDonor({
        userData: formValues.register,
        address: formValues.address
   })

    await authenticate({
      email: formValues.register.email,
      password: formValues.register.password
    })
  } catch(error) {
    console.error(error)
  }
}

async function handleSubmit() {
    const formValues = {
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
            zipCode: $("#cep").val()
        }  
    }

    const registerType = $("input[name='role']:checked").val()
    try {
      $('#btn-form').addClass('loading');

      switch(registerType) {
        case 'USER': 
        await registerUser(formValues)
        break;
        case 'DONOR': 
        await registerDornor(formValues)
        break;
        default:
          throw new Error("Need to specify USER or DONOR")
        }
      } catch(error) {
        console.error(error)
      } finally {
        $('#btn-form').removeClass('loading');
      }
}

$("form").on("submit", async function (event) {
    event.preventDefault(); 
    await handleSubmit()
});
