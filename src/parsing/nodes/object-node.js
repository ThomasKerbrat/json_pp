
class ObjectNode {
    constructor(items) {
        this.items = new Array();
        this.existingKeys = null;

        for (let item of items) {
            this.addItem(item);
        }
    }

    addItem(keyValueNode) {
        if (this.existingKeys === null) {
            this.existingKeys = new Set();
        }

        if (this.existingKeys.has(keyValueNode.key)) {
            return false;
        } else {
            this.items.push(keyValueNode);
            this.existingKeys.add(keyValueNode.key);
            return true;
        }
    }

    accept(visitor) {
        visitor.visitObject(this);
    }
}

module.exports = { ObjectNode };
