const Todo = require("../models/Todo");

const output = {
    home: (req, res) => {
        res.sendFile("index.html", {
          root: __dirname + "/../views",
        });
    },

    todos: async (req, res) => {
        const todo = new Todo(req.body); // 갖고는 있지만 아무것도 없음
        const result = await todo.load();
        res.json(result);
    }
};

const input = {
    home: async (req, res) => {
        const todo = new Todo(req.body);
        const result = await todo.create();
        res.json(result);
    },

    remove: async (req, res) => {
        const id = req.params.id;
        const todo = new Todo(req.body); // 갖고는 있지만 아무것도 없음
        const result = await todo.remove(id);
        res.json(result);
    },

    update: async (req, res) => {
        const id = req.params.id;
        const todo = new Todo(req.body); // update할 최신 정보
        const result = await todo.update(id);
        res.json(result);
    }
};

module.exports = {
    output,
    input,
};

//- 같은 이름이지만, 객체 나누어 접근 방식과 기능을 다르게 만들어보자.
//- 현재처럼 request의 body에 접근하기 위해서는 body-parser가 필요하다.