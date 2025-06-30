const btn = document.querySelector(".todo-button");
const input = document.querySelector(".todo-input");
const list = document.querySelector(".TodoBox");

btn.addEventListener("click", addTodo);

input.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        addTodo();
    }
});

function addTodo() {
    const text = input.value.trim();
    if (text === "") {
        alert("내용을 입력해!!");
        return;
    }

    const div = document.createElement("div");

    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");

    const span = document.createElement("span"); // 수정 예정

    const editBtn = document.createElement("button");
    const editImg = document.createElement("img");
    editImg.setAttribute("src", "Edit.svg");
    editImg.setAttribute("alt", "수정");
    editBtn.appendChild(editImg);
    editBtn.classList.add("todo-button");

    const deleteBtn = document.createElement("button");
    const deleteImg = document.createElement("img");
    deleteImg.setAttribute("alt", "삭제");
    deleteImg.setAttribute("src", "Delete.svg");
    deleteBtn.appendChild(deleteImg);
    deleteBtn.classList.add("todo-button");

    div.appendChild(check);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    

    div.classList.add("todo-list");
    list.appendChild(div);
    input.value = "";
}