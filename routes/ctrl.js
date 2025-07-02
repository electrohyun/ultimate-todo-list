const Todo = require("../models/Todo");

const output = {
    home: (req, res) => {
        res.sendFile("index.html", {
          root: __dirname + "/../views",
        });
    },
};

const input = {
    home: async (req, res) => {
        const todo = new Todo(req.body);
        const result = await todo.create();
        res.json(result);
    },
};

module.exports = {
    output,
    input,
};

//- 같은 이름이지만, 객체 나누어 접근 방식과 기능을 다르게 만들어보자.
//- 현재처럼 request의 body에 접근하기 위해서는 body-parser가 필요하다.