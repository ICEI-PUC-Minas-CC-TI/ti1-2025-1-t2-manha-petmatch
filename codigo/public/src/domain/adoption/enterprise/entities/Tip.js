import { Entity } from "../../../../../core/entities/entity.js";

export class Tip extends Entity {
   
    get animalTypeId() {
        return this.props.animalTypeId
    }

    get imgUrl() {
        return this.props.imgUrl
    }
    
    get tips() {
        return this.props.tips
    }

    get createdAt() {
        return this.props.createdAt;
    }


    static create(props, id) {
        const tip = new Tip({
            ...props,
            createdAt: props.createdAt ?? new Date(),

        }, id);

        return tip;
    }
}