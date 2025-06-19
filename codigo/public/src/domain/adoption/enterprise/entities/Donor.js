import { Entity } from "../../../../../core/entities/entity.js";

export class Donor extends Entity {
    get adoptionAmount() {
        return this.props.adoptionAmount;
    }

    
    set adoptionAmount(value) {
        this.props.adoptionAmount = value;
        this.touch();
    }
    
    get userId() {
        return this.props.userId;
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