import { Entity } from "../../../../../core/entities/entity.js";

export class User extends Entity {
    get cpf() {
        return this.props.cpf;
    }

    get name() {
        return this.props.name;
    }

    set name(value) {
        this.props.name = value;
        this.touch()   
    }

    get phoneNumber() {
        return this.props.phoneNumber;
    }

    set phoneNumber(value) {
        this.props.phoneNumber = value;
        this.touch()   
    }

    get description() {
        return this.props.description;
    }

    set description(value) {
        this.props.description = value;
        this.touch()   
    }

    get bornAt() {
        return this.props.bornAt;
    }

    get imgUrl() {
        return this.props.imgUrl;
    }

    set imgUrl(value) {
        this.props.imgUrl = value;
        this.touch()   
    }


    get email() {
        return this.props.email;
    }

    get passoword() {
        return this.props.passoword;
    }

    set passoword(value) {
        this.props.passoword = value;
        this.touch()   
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    // Somente para campos que não são relevantes para adoção.
    touch() {
        this.props.updatedAt = new Date();
    }

    static create(props, id) {
        const user = new User({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()

        }, id);

        return user;
    }
}