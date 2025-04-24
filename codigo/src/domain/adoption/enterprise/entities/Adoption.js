import {Entity} from "../../../../../core/entities/entity.js"

export class Adoption extends Entity {
    get adopterId() {
        return this.props.adopterId;
    }

    get donorId() {
        return this.props.donorId;
    }

    get petId() {
        return this.props.petId;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    static create(props, id) {
        const adoption = new Adoption({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);

        return adoption;
    }
}z