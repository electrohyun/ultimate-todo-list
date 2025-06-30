const btn = document.querySelector(".todo-addBtn");
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
    check.classList.add("todo-checkBtn");
    check.addEventListener("change", () => {
        if (check.checked) {
            span.classList.add("todo-checked");
            editImg.classList.add("todo-hidden");
        } else {
            span.classList.remove("todo-checked");
            editImg.classList.remove("todo-hidden");
        }
    })

    const span = document.createElement("span"); // 수정 예정
    span.textContent = text;
    span.classList.add("todo-span");

    const editBtn = document.createElement("button");
    const editImg = document.createElement("img");
    editImg.setAttribute("src", "Edit.svg");
    editImg.setAttribute("alt", "수정");
    editBtn.appendChild(editImg);
    editBtn.classList.add("todo-optBtn");
    editBtn.addEventListener("click", () => editTodo(span, editBtn, div));

    const deleteBtn = document.createElement("button");
    const deleteImg = document.createElement("img");
    deleteImg.setAttribute("alt", "삭제");
    deleteImg.setAttribute("src", "Delete.svg");
    deleteBtn.appendChild(deleteImg);
    deleteBtn.classList.add("todo-optBtn");
    deleteBtn.addEventListener("click", () => {
        deleteBtn.parentElement.remove();
    })

    div.appendChild(check);
    div.appendChild(span);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);

    div.classList.add("todo-list");
    list.appendChild(div);
    input.value = "";
}

function editTodo(span, edit, div) {
    // sp가 input으로 바뀜
    const inputField = document.createElement("input");
    inputField.value = span.textContent;
    inputField.classList.add("todo-span");
    div.replaceChild(inputField, span);
    inputField.focus();

    // 수정버튼이 완료버튼으로 바뀜
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "완료";
    doneBtn.classList.add("todo-completeBtn");
    div.replaceChild(doneBtn, edit);

    doneBtn.addEventListener("click", () => {
        if (inputField.value.trim() === "") {
            alert("빈 값 저장 인됩니다.");
            return;
        }

        const newSpan = document.createElement("span");
        newSpan.textContent = inputField.value;
        newSpan.classList.add("todo-span");
        div.replaceChild(newSpan, inputField);

        const newEditBtn = document.createElement("button");
        const newEditImg = document.createElement("img");
        newEditImg.setAttribute("src", "Edit.svg");
        newEditImg.setAttribute("alt", "수정");
        newEditBtn.appendChild(newEditImg);
        newEditBtn.classList.add("todo-optBtn");
        div.replaceChild(edit, doneBtn);

        edit.addEventListener("click", () => {
            editTodo(newSpan, newEditBtn, div);
        });


    });

}