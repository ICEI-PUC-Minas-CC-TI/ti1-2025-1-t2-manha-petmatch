import { Entity } from "../../../../../core/entities/entity.js";

export class Address extends Entity {
    get entityId() {
        return this.props.entityId;
    }

    set entityId(value) {
        this.props.entityId = value;
        this.touch();
    }

    get entityType() {
        return this.props.entityType;
    }

    set entityType(value) {
        this.props.entityType = value;
        this.touch();
    }

    get street() {
        return this.props.street;
    }

    set street(value) {
        this.props.street = value;
        this.touch();
    }

    get number() {
        return this.props.number;
    }

    set number(value) {
        this.props.number = value;
        this.touch();
    }

    get complement() {
        return this.props.complement;
    }

    set complement(value) {
        this.props.complement = value;
        this.touch();
    }

    get neighborhood() {
        return this.props.neighborhood;
    }

    set neighborhood(value) {
        this.props.neighborhood = value;
        this.touch();
    }

    get city() {
        return this.props.city;
    }

    set city(value) {
        this.props.city = value;
        this.touch();
    }

    get state() {
        return this.props.state;
    }

    set state(value) {
        this.props.state = value;
        this.touch();
    }

    get zipCode() {
        return this.props.zipCode;
    }

    set zipCode(value) {
        this.props.zipCode = value;
        this.touch();
    }

    get country() {
        return this.props.country;
    }

    set country(value) {
        this.props.country = value;
        this.touch();
    }

    get latitude() {
        return this.props.latitude;
    }

    set latitude(value) {
        this.props.latitude = value;
        this.touch();
    }

    get longitude() {
        return this.props.longitude;
    }

    set longitude(value) {
        this.props.longitude = value;
        this.touch();
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }
   
    touch() {
        this.props.updatedAt = new Date();
    }

    static create(props, id) {
        const address = new Address({
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        }, id);
        
        return address;
    }
}