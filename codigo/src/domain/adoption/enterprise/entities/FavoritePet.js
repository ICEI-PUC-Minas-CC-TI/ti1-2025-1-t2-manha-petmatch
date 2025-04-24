import { Entity } from "../../../../../core/entities/entity.js";

export class FavoritePet extends Entity {
    get appraiser_id() {
        return this.props.appraiser_id;
    }

    get pet_id() {
        return this.props.pet_id;
    }

    get value()  {
        return this.props.value;
    }

    set value(value) {
        return this.props.value = value;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    static create(props, id) {
        const FavoritePet = new FavoritePet({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }, id);

        return FavoritePet;
    }
}