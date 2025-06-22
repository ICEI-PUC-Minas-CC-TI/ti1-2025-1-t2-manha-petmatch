import {Entity} from "../../../../../core/entities/entity.js"

export class Adoption extends Entity {
    get userId() {
        return this.props.userId;
    }

    get donorId() {
        return this.props.donorId;
    }

    get petId() {
        return this.props.petId;
    }

    get status() {
        return this.props.status;
    }

    set status(value) {
        this.props.status = value
        this.touch()
    }

    get createdAt() {
        return this.props.createdAt;
    }

    touch() {
        this.props.updatedAt = new Date();
    }

    static create(props, id) {
        const adoption = new Adoption({
            ...props,
            status: props.status ?? 'PENDING',
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        }, id);

        return adoption;
    }
}