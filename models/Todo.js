const TodoStorage = require("./TodoStorage");

class Todo {
    constructor(body) { 
        this.body = body; 
    }

    async create() {
        return await TodoStorage.save(this.body);
    }

    async load() {
        return await TodoStorage.getAll();
    }

    async remove(id) {
        return await TodoStorage.remove(id);
    }

    async update(id) {
        return await TodoStorage.update(id, this.body);
    }

    // static async list() {
    //     return await TodoStorage.getAll();
    // }
}

module.exports = Todo;