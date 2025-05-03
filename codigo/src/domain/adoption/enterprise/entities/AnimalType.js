import {Entity} from "../../../../../core/entities/entity.js"

export class AnimalType extends Entity {
    get type() {
        return this.props.type;
    }

    get imgUrlReference() {
        return this.props.imgUrlReference;
    }

    set imgUrlReference(newUrl) {
        this.props.imgUrlReference = newUrl;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    static create(props, id) {
        const adoption = new AnimalType({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);

        return adoption;
    }
}