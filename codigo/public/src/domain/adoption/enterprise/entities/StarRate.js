import { Entity } from "../../../../../core/entities/entity.js";

export class StarRate extends Entity {

    // Apreciador, quem está avaliando
    get appraiserId() {
        return this.props.appraiserId;
    }
    get ratedEntityId() {
        return this.props.ratedEntityId;
    }
    get rate() {
        return this.props.rate;
    }
    set rate(value) {
        this.props.rate = value;
        touch();
    }

    touch() {
        this.props.updatedAt = new Date();
    }

    static create(props, id) {
        const starRate = new StarRate({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        }, id);
        
        return starRate;
    }  
}