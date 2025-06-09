import {Entity} from "../../../../../core/entities/entity.js"

export class AnimalType extends Entity {
    get type() {
        return this.props.type;
    }

    get imgUrlReference() {
        return this.props.imgUrlReference;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    static create(props, id) {
        const adoption = new AnimalType({
            ...props,
            createdAt: props.createdAt ?? new Date()
        }, id);

        return adoption;
    }
}