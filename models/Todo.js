const TodoStorage = require("./TodoStorage");

class Todo {
    constructor(body) { 
        this.body = body; 
    }

    async create() {
        const client = this.body;
        return await TodoStorage.save(client);
    }

    // static async list() {
    //     return await TodoStorage.getAll();
    // }
}

module.exports = Todo;