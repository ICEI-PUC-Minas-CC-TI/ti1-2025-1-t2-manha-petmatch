import { Entity } from "../../../../../core/entities/entity.js";

export class FavoritePet extends Entity {
    get appraiserId() {
        return this.props.appraiserId;
    }

    get petId() {
        return this.props.petId;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    static create(props, id) {
        const favoritePet = new FavoritePet({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);

        return favoritePet;
    }
}