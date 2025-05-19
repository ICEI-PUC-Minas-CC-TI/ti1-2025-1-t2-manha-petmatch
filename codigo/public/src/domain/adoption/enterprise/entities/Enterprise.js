import { Entity } from "../../../../../core/entities/entity.js";

export class Enterprise extends Entity {
    get cnpj() {
        return this.props.cnpj;
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

    get foundedAt() {
        return this.props.foundedAt;
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

    static create(props, id) {
        const enterprise = new Enterprise({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }, id);

        return enterprise;
    }
}