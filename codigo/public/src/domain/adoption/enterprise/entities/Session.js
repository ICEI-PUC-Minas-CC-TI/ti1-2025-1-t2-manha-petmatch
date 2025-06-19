import { Entity } from "../../../../../core/entities/entity.js";

export class Session extends Entity {
    get userId() {
        return this.props.userId
    }

    get donorId() {
        return this.props.donorId
    }

    get expiresAt() {
        return this.props.expiresAt
    }

    get createdAt() {
        return this.props.createdAt    
    }

    get entityType() {
        return this.props.entityType
    }

    static create(props, id) {
        const donor = new Session({...props,
            createdAt: props.createdAt ?? new Date(),
        }, id)

        return donor;
    }
} 