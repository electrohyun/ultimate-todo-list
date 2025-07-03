const db = require("../config/db");

class TodoStorage {
    static save(todo) {
        const query = "INSERT INTO todo(description) VALUES (?)";
        return new Promise((res, rej) => {
            db.query(query, [todo.description], (err, data) => {
                if (err) rej(`${err}`);
                
                const newId = data.insertId;
                const newQuery = "SELECT * FROM todo WHERE id = ?";
                db.query(newQuery, newId, (err, data) => {
                    if (err) rej(`${err}`);

                    res({ success: true, todo: data[0] });
                })
            });
        });
    }

    static getAll() {
        const query = "SELECT * FROM todo";
        return new Promise((res, rej) => {
            db.query(query, (err, data) => {
                if (err) rej(`${err}`);
                res(data);
            })
        })
    }

    static remove(id) {
        const query = "DELETE FROM todo WHERE id = ?"
        return new Promise((res, rej) => {
            db.query(query, id, (err, data) => {
                if (err) rej(`${err}`);
                res({ success: true });
            });
        });
    }

    // static save(todo) {
    //     const query = "INSERT INTO todo(description) VALUES (?)";
    //     return new Promise((res, rej) => {
    //         db.query(query, [todo.description], (err, data) => {
    //             if (err) rej(`${err}`);
                
    //             const newId = data.insertId;
    //             const newQuery = "SELECT * FROM todo WHERE id = ?";
    //             db.query(newQuery, newId, (err, data) => {
    //                 if (err) rej(`${err}`);

    //                 res({ success: true, todo: data[0] });
    //             })
    //         });
    //     });
    // }

    static update(id, body) {
        const query1 = "UPDATE todo SET description = ?, is_check = ? WHERE id = ?";
        
        return new Promise((res, rej) => {
            db.query(query1, [body.description, body.is_check, id], (err, data) => {
                if (err) rej(`${err}`);
                res({success: true});
            });
        });
    }
}
module.exports = TodoStorage;