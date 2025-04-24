import {Entity} from "../../../../../core/entities/entity.js"

export class AdopterHistory extends Entity {
    get action() {
        return this.props.action;
    }

    get adopterId() {
        return this.props.adopterId;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    static create(props, id) {
        const adopterHistory = new AdopterHistory({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);

        return adopterHistory;
    }
}