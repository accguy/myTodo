const $ul = document.querySelector("ul");
const $input = document.querySelector("input");
const $submitBtn = document.querySelector(".submit-btn");
const url = "http://localhost:3000/todoList";

// 받아온 데이터 화면에 렌더링하기
// 아이템 1개의 li를 생성해서 ul에 추가하는 함수
const renderItem = (item) => {
  // 요소 생성
  const $li = document.createElement("li");
  const $deleteBtn = document.createElement("button");
  const $editBtn = document.createElement("button");
  const $checkbox = document.createElement("input");
  const $innerText = document.createElement("span");

  // 요소에 클래스 추가
  $deleteBtn.classList.add("delete-btn");
  $editBtn.classList.add("edit-btn");
  $checkbox.classList.add("check-box");
  // $li에 아이디 부여
  $li.id = item.id;

  $innerText.innerText = item.todo;
  $deleteBtn.innerText = "삭제";
  $editBtn.innerText = "수정";
  $checkbox.type = "checkbox";
  $checkbox.checked = item.done;

  $li.append($checkbox, $innerText, $editBtn, $deleteBtn);
  $ul.appendChild($li);
};

// 서버에 있는 데이터 요청하기
const fetchAndRenderTodos = async () => {
  const res = await fetch(url);
  const todoList = await res.json();
  console.log(todoList);
  todoList.forEach(renderItem);
};
fetchAndRenderTodos();

// 이벤트 리스너
document.addEventListener("click", (e) => {
  const parentId = e.target.parentNode.id;
  const targetClassList = e.target.classList;

  if (targetClassList == "submit-btn") {
    e.stopPropagation();
    createTodo();
  } else if (targetClassList == "delete-btn") {
    removeTodo(parentId);
  } else if (targetClassList == "edit-btn") {
    updateTodo(parentId);
  } else if (targetClassList == "check-box") {
    const isChecked = e.target.checked;
    updateTodoStatus(parentId, isChecked);
  }
});

// DB에 데이터 추가하는 함수
const createTodo = async () => {
  try {
    const res = await fetch(url, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: `${$input.value}`, done: false }),
    });

    if (!res.ok) {
      throw new Error("Failed to post data");
    }

    const newTodo = await res.json();
    renderItem(newTodo);
    $input.value = "";
  } catch (error) {
    console.log(error);
    alert("데이터 추가에 실패하였습니다.");
    $input.value = "";
  }
};

// DB에서 데이터 삭제하는 함수
const removeTodo = async (id) => {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to remove data");
    }

    let deletedTodo;
    // res.json()도 예외처리를 해주는게 맞는건가?
    try {
      deletedTodo = await res.json(); // 응답이 JSON 형식인지 확인한 후에 파싱합니다.
    } catch (error) {
      throw new Error("Failed to parse response as JSON");
    }

    // DOM에서 요소 제거
    const $li = document.getElementById(deletedTodo.id);
    $li.remove();
  } catch (error) {
    console.log(error);
    alert("데이터 삭제에 실패하였습니다.");
  }
};

// DB 데이터 수정하는 함수
const updateTodo = async (id) => {
  const newText = prompt("수정할 내용을 입력하세요");
  const res = await fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ todo: `${newText}` }),
  });

  if (!res.ok) {
    throw new Error("Failed to update data");
  }

  const updatedTodo = await res.json();
  console.log(updatedTodo);
  const $li = document.getElementById(updatedTodo.id);
  const todoText = $li.querySelector("span");
  todoText.innerText = updatedTodo.todo;
};

// DB 체크여부 수정하는 함수
const updateTodoStatus = (id, isChecked) => {
  fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({ done: isChecked }),
  });
};
