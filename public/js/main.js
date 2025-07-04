const header = document.querySelector(".todo-header");
const btn = document.querySelector(".todo-addBtn");
const input = document.querySelector(".todo-input");
const list = document.querySelector(".TodoBox");
const container = document.createElement("div");
container.className = "floating-container";
document.body.appendChild(container);


header.classList.add("roll-in-blurred-top");
header.addEventListener("click", () => {
  location.reload();
})

document.addEventListener("DOMContentLoaded", () => {
  fetchTodo();
});

btn.addEventListener("click", addTodo);

input.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    addTodo();
  }
});

function loadTodo(todo) {
  drawTodo(todo);
}

function fetchTodo() {
  fetch("/todos")
  .then(res => res.json())
  .then(todos => {
    const todoTexts = [];

    todos.forEach(todo => {
      loadTodo(todo);
      todoTexts.push(todo.description);
    })

    const container = document.querySelector(".floating-container");
    generateFloatingTodo(container, todoTexts);
  })
  .catch(err => {
    alert("백엔드가 잘못함");
  })
}

function addTodo() {
  // 프론트
  const text = input.value.trim();
  if (text === "") {
    alert("내용을 입력하세용");
    return;
  }

  // 백엔드
  const req = {
    description: text,
  };

  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      drawTodo(data.todo);
    } else {
      alert("오류 발생");
    }
  })
  .catch(err => {
    console.error("백엔드가 잘못함", err);
    alert("백엔드가 잘못함");
  });

  input.value = "";
}

function drawTodo(todo) {
  const div = document.createElement("div");
  // 백엔드 정보 저장
  div.dataset.id = todo.id;
  div.dataset.date = todo.in_date;

  const check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.classList.add("todo-checkBtn");

  const span = document.createElement("span");
  span.textContent = todo.description;
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

  span.addEventListener("dblclick", handler);
  editBtn.addEventListener("click", handler, { once: true });

  const deleteBtn = document.createElement("button");
  const deleteImg = document.createElement("img");
  deleteImg.setAttribute("alt", "삭제");
  deleteImg.setAttribute("src", "/Delete.svg");
  deleteBtn.appendChild(deleteImg);
  deleteBtn.classList.add("todo-optBtn");

  deleteBtn.addEventListener("click", () => {
    deleteTodo(div.dataset.id);
    div.classList.remove("fade-in");
    div.classList.add("fade-out");
    div.addEventListener("animationend", () => {
      deleteBtn.parentElement.remove();
    });
  });

  if (todo.is_check) {
    check.setAttribute("checked", "");
    span.classList.add("todo-checked");
    editImg.classList.add("todo-hidden");
  } 

  check.addEventListener("change", () => {
    const img = editBtn.querySelector("img"); // ✅ 이 한 줄이 핵심!

    if (check.checked) {
      updateTodo(div.dataset.id, span.textContent, true);
      span.classList.add("todo-checked");
      img?.classList.add("todo-hidden");
    } else {
      updateTodo(div.dataset.id, span.textContent, false);
      span.classList.remove("todo-checked");
      img?.classList.remove("todo-hidden");
    }
  });

  // 프론트 반영
  div.appendChild(check);
  div.appendChild(span);
  div.appendChild(editBtn);
  div.appendChild(deleteBtn);

  div.classList.add("todo-list");
  div.classList.add("fade-in");
  list.appendChild(div);
}

function editTodo(span, edit, handler, div) {
  const inputField = document.createElement("input");
  inputField.value = span.textContent;
  inputField.classList.add("todo-span");
  div.replaceChild(inputField, span);
  inputField.focus();

  edit.innerText = "완료";
  edit.classList.replace("todo-optBtn", "todo-completeBtn");

  edit.removeEventListener("click", handler);

  edit.addEventListener("click", recoverTodo);
  
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      recoverTodo();
    }
    if (e.key === "Escape") {
      inputField.value = span.textContent;
      recoverTodo();
    }
  });

  function recoverTodo() {
    if (inputField.value.trim() === "") {
      alert("빈 값 저장 안됩니다.");
      return;
    }
    
    const isChecked = div.querySelector(".todo-checkBtn").checked;
    updateTodo(div.dataset.id, inputField.value, isChecked);

    span.textContent = inputField.value;
    if (div.contains(inputField)) div.replaceChild(span, inputField);

    edit.innerText = "";
    const editImg = document.createElement("img");
    // 수정 후 체크박스 연결 x
    editImg.setAttribute("src", "/Edit.svg");
    editImg.setAttribute("alt", "수정");
    edit.appendChild(editImg);
    edit.classList.replace("todo-completeBtn", "todo-optBtn");

    edit.addEventListener("click", handler, { once: true });
  }
}

function deleteTodo(id) {
  fetch(`/todos/${id}`, { method: "DELETE" })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      
    } else {
      alert("오류 발생");
    }
  })
  .catch(err => {
    console.error("백엔드가 잘못함", err);
    alert("백엔드가 잘못함");
  });
}

function updateTodo(id, desc, check) {
  fetch(`/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      description : desc,
      is_check : check
    })
  });
}

// 여기부터 없어도 됨(버블)

function generateFloatingTodo(containerDiv, todoList) {
  const sampleCount = Math.min(todoList.length, 8); 

  const picked = new Set();
  while (picked.size < sampleCount) {
    const rand = Math.floor(Math.random() * todoList.length);
    picked.add(todoList[rand]);
  }

  picked.forEach((text) => {
    createFloatingTodo(text, containerDiv);
  });
}

function createFloatingTodo(text, container) {
  const bubble = document.createElement("div");
  bubble.className = "floating-item";
  bubble.textContent = text;

  // 위치 지정
  const side = Math.random() < 0.5 ? "left" : "right";
  if (side === "left") {
    bubble.style.left = `${Math.random() * 25}%`;
  } else {
    bubble.style.left = `${60 + Math.random() * 25}%`;
  }
  bubble.style.top = `${Math.random() * 100}%`;

  // 첫 애니메이션 (floatUp)
  const delay = Math.random() * 3;
  bubble.style.animation = `floatUp 6s ease-out ${delay}s forwards`;

  container.appendChild(bubble);

  // floatUp 애니메이션이 끝나면 → floatIdle 시작
  bubble.addEventListener("animationend", () => {
    // floatIdle 반복 애니메이션 적용
    bubble.style.animation = `floatIdle 3s ease-in-out infinite`;
    bubble.style.opacity = "0.5"; // 다시 설정해줘야 함
  });
}
