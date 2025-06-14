import { Entity } from "/core/entities/entity.js"; // Caminho absoluto assumindo codigo/core/entities/entity.js

export class RatingUser extends Entity {
    get appraiserId() {
        return this.props.appraiserId;
    }

    get ratedId() { // Adicionado o getter para ratedId
        return this.props.ratedId;
    }

    get content() {
        return this.props.content;
    }

    get rate() {
        return this.props.rate;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    static create(props, id) {
        const ratingUser = new RatingUser({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);

        return ratingUser;
    }
}