import {Entity} from "../../../../../core/entities/entity.js"

export class Pet extends Entity {
    get name() {
        return this.props.name;
    }

    set name(value) {
        this.props.name = value;
        this.touch();
    }

    get animalTypeId() {
        return this.props.animalTypeId;
    }

    set animalTypeId(value) {
        this.props.animalTypeId = value;
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

    get breed() {
        return this.props.breed;
    }

    set breed(breed) {
        this.props.breed = breed;
    }

    get bornAt() {
        return this.props.bornAt;
    }

    set bornAt(value) {
        this.props.bornAt = value;
        this.touch();
    }

    get availableForAdoption() {
        return this.props.availableForAdoption;
    }

    set availableForAdoption(value) {
        this.props.availableForAdoption = value;
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

    set updatedAt(date) {
        this.props.updatedAt = date
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
}