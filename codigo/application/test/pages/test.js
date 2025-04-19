import { RegisterUserUseCase } from "../../domain/adoption/application/use-cases/register-user.js";

const obj = {
    create: (value) => console.log(value),
    findByCpf: () => {return null},
    findByEmail: () => {return null}
}

const newObj = new RegisterUserUseCase(obj)

const a = await newObj.execute({
    email: "asdsa",
    cpf: "11111111111", 
    password: "sadsada",
    name: "dssdf", 
    bornAt: "asda",
    phoneNumber: "sadasd",
})

console.log(a)