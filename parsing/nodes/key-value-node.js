
class KeyValueNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    accept(visitor) {
        visitor.visitKeyValue(this);
    }
}

module.exports = { KeyValueNode };
