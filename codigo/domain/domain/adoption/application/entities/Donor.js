import { Entity } from "../../../../../core/entities/entity.js";

export class Donor extends Entity {

    get registeredAt() {
        return this.props.createdAt;
    }

    get adoptionAmount() {
        return this.props.adoptionAmount;
    }

    get donorId() {
        return this.props.donorId;
    }

    set adoptionAmount(value) {
        this.props.adoptionAmount = value;
        this.touch();
    }

    get donorType() {
        return this.props.donorType;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }


    touch() {
        this.props.updatedAt = new Date();
    }

    static create(props, id) {
        const donor = new Donor({...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        }, id)

        return donor;
    }
} 