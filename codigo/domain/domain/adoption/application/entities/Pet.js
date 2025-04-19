import {Entity} from "../../../../../core/entities/entity.js"

export class Pet extends Entity {
    get name() {
        return this.props.name;
    }

    set name(value) {
        this.props.name = value;
        this.touch();
    }

    get type() {
        return this.props.type;
    }

    set type(value) {
        this.props.type = value;
        this.touch();
    }

    get size() {
        return this.props.size;
    }

    set size(value) {
        this.props.size = value;
        this.touch();
    }

    get animalSex() {
        return this.props.animalSex;
    }

    set animalSex(value) {
        this.props.animalSex = value;
        this.touch();
    }
    
    get description() {
        return this.props.description;
    }

    set description(value) {
        this.props.description = value;
        this.touch();
    }


    get born_at() {
        return this.props.born_at;
    }

    set born_at(value) {
        this.props.born_at = value;
        this.touch();
    }

    get avalaibleForAdoption() {
        return this.props.avalaibleForAdoption;
    }

    set avalaibleForAdoption(value) {
        this.props.avalaibleForAdoption = value;
        this.touch();
    }

    get castrated() {
        return this.props.castrated;
    }

    set castrated(value) {
        this.props.castrated = value;
        this.touch();
    }

    get vaccinated() {
        return this.props.vaccinated;
    }

    set vaccinated(value) {
        this.props.vaccinated = value;
        this.touch();
    }

    get personality() {
        return this.props.personality;
    }

    set personality(value) {
        this.props.personality = value;
        this.touch();
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }
    // Ver depois
    get imgUrls() {
        return this.props.imgUrls;
    }

    set imgUrls(value) {
        this.props.imgUrls = value;
        this.touch();
    }

    get donorId() {
        return this.props.donorId
    }
    set donorId(value) {
        this.props.donorId = value;
        this.touch();
    }

    get currentAdopterId() {
        return this.props.currentAdopterId
    }
    set currentAdopterId(value) {
        this.props.currentAdopterId = value;
        this.touch();
    }

    touch() {
        this.props.updated_at = new Date();
    }

    static create(props, id) {
        const pet = new Pet({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }, id);

        return pet;
    }
}z