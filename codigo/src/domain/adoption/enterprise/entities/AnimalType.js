import {Entity} from "../../../../../core/entities/entity.js"

export class AniamlType extends Entity {
    get type() {
        return this.props.type;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    static create(props, id) {
        const adoption = new AniamlType({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);

        return adoption;
    }
}