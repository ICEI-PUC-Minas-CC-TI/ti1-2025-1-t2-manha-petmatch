import {Entity} from "../../../../../core/entities/entity.js"

export class DonorHistory extends Entity {
    get action() {
        return this.props.action;
    }

    get donorId() {
        return this.props.donorId;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    static create(props, id) {
        const donorHistory = new DonorHistory({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);

        return donorHistory;
    }
}