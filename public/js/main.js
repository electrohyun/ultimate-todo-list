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
    editImg.setAttribute("src", "/Edit.svg");
    editImg.setAttribute("alt", "수정");
    editBtn.appendChild(editImg);
    editBtn.classList.add("todo-optBtn");

    function handler() {
        editTodo(span, editBtn, handler, div);
    }

    editBtn.addEventListener("click", handler, { once : true });

    const deleteBtn = document.createElement("button");
    const deleteImg = document.createElement("img");
    deleteImg.setAttribute("alt", "삭제");
    deleteImg.setAttribute("src", "/Delete.svg");
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

function editTodo(span, edit, handler, div) {
    // sp가 input으로 바뀜
    const inputField = document.createElement("input");
    inputField.value = span.textContent;
    inputField.classList.add("todo-span");
    div.replaceChild(inputField, span);
    inputField.focus();

    // 수정버튼이 완료버튼으로 바뀜
    // 수정버튼의 text = "완료", css 변경, 기능 변경
    edit.innerText = "완료";
    edit.classList.replace("todo-optBtn", "todo-completeBtn");
    // 기존 기능 삭제 후 새 기능 부착
    // 새 기능: 완료를 누르면
    // 1. 빈값 경고
    // 2. input -> span
    // 3. edit 버튼 수정 (텍스트 -> 그림)
    edit.removeEventListener("click", handler);

    edit.addEventListener("click", () => {
        if (inputField.value.trim() === "") {
            alert("빈 값 저장 안됩니다.");
            return;
        }

        // input -> span 교체
        span.textContent = inputField.value;
        if (div.contains(inputField)) div.replaceChild(span, inputField);
        // 버튼 교체
        edit.innerText = "";
        const editImg = document.createElement("img");
        editImg.setAttribute("src", "/Edit.svg");
        editImg.setAttribute("alt", "수정");
        edit.appendChild(editImg);
        edit.classList.replace("todo-completeBtn", "todo-optBtn");

        edit.addEventListener("click", handler, { once : true });
    });
}