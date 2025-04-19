import { User } from "../../domain/adoption/enterprise/entities/User.js";

const props = {
    name: "some Name",
    cpf: "123231",
}

const user = User.create(props)

console.log("Antes:", user.updatedAt)

setTimeout(() => {
    user.name = "jOAO"
    console.log("Depois:", user.updatedAt)
}, 10000)
