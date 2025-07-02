const db = require("../config/db");

class TodoStorage {
    static save(todo) {
        //console.log(todo);
        const query = "INSERT INTO todo(description) VALUES (?)";
        // todo.description
        return new Promise((res, rej) => {
            db.query(query, [todo.description], (err, data) => {
                if (err) rej(`${err}`);
                res(data);
            });
        });
    }

    // static getAll() {
    //     const query = "SELECT * FROM todo"
    //     return new Promise((res, rej) => {
    //         db.query(query, (err, rows) => {
    //             if (err) return rej(err);
    //             res(rows);
    //         });
    //     });
    // }
}
module.exports = TodoStorage;