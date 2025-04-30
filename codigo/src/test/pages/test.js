import { RegisterUserUseCase} from "../../domain/adoption/application/use-cases/register-user.js";

import { JsonUserRepository } from "../../database/repositories/adoption/json-user-repository.js";
import { DeleteUserUseCase } from "../../domain/adoption/application/use-cases/delete-user.js";

const submitButton = document.getElementById("submit")
const deleteButton = document.getElementById("delete")
const textArea = document.getElementById("textArea")
const deleteId = document.getElementById("deleteId")
let currentText = "";

const result = document.getElementById("result")

const db = new JsonUserRepository();


async function deleteUserUseCase() {

    const deleteFunction = new DeleteUserUseCase(db);

    const result = await deleteFunction.execute({id: deleteId.value})
    console.log(result)

} 

async function registerUser() { 
    const registerFunction = new RegisterUserUseCase(db);

    console.log(currentText)

       
    return await registerFunction.execute(JSON.parse(currentText));
}

submitButton.addEventListener('click', async () => {

    try {
        user = await registerUser();
        arr.push(user)
        console.log(arr)
        result.innerHTML = JSON.stringify(user, null, 2); 
    } catch (error) {
        console.error("Error during registration:", error);
        result.innerHTML = "An error occurred. Check console.";
    }
});


deleteButton.addEventListener('click', async () => {
    try {
        await deleteUserUseCase();
    } catch (error) {
        console.error("Error during registration:", error);
        result.innerHTML = "An error occurred. Check console.";
    }
})

textArea.addEventListener("input", (event) => {
    currentText = event.target.value
})


window.addEventListener("load", (event) => {
    currentText = JSON.stringify({
        email: "pedrgdgo.silva@example.com",
        cpf: "00499388289",
        password: "P@ssw0rd123",
        name: "Cra",
        bornAt: "1995-08-15",
        phoneNumber: "+55 31 91234-5678",
        description: "Apaixonado por tecnologia, estudante dedicado e sempre em busca de novos desafios.",
        img_url: "https://example.com/profile-pedro.jpg"
    })
    
    
    textArea.value = currentText
})