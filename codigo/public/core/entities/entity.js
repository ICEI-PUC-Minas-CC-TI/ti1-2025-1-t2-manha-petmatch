export class Entity {
    _id;
    props;

    get id() {
        return this._id
    }

    constructor(props, id) {
        this.props = props;
        this._id = id ?? self.crypto.randomUUID();
    }

    equals(entity) {
        if(entity === this) {
            return true;
        }
    
        if(entity.id === this._id){
            return true;
        }

        return false;
    }

}