const $ul = document.querySelector("ul");
const $input = document.querySelector("input");
const $submitBtn = document.querySelector(".submit-btn");

// 서버에 있는 데이터 요청하기
// 받아온 데이터 화면에 렌더링하기

const renderItems = (item) => {
  // 요소 생성
  const $li = document.createElement("li");
  const $deleteBtn = document.createElement("button");
  const $editBtn = document.createElement("button");
  const $checkbox = document.createElement("input");
  // 요소에 클래스 추가
  $deleteBtn.classList.add("delete-btn");
  $editBtn.classList.add("edit-btn");
  $checkbox.classList.add("check-box");

  $li.innerText = item.todo;
  $deleteBtn.innerText = "삭제";
  $editBtn.innerText = "수정";
  $checkbox.type = "checkbox";

  $li.append($checkbox, $editBtn, $deleteBtn);
  $ul.appendChild($li);
};

const url = "http://localhost:3000/todoList";
const getDataAndRender = async () => {
  const res = await fetch(url);
  const todoList = await res.json();
  console.log(todoList);
  todoList.forEach(renderItems);
};
getDataAndRender();

// 인풋에 값을 입력하고 제출 버튼을 누르면
// 리스트에 새로운 항목 생성됨
// DB에 새로운 아이템 추가 요청 post

// 이벤트 리스너는 이벤트 위임으로 하자
//
document.addEventListener("click", (e) => {
  if (e.target.classList == "submit-btn") {
    console.log(0);
    addTodo();
  } else if (e.target.classList == "delete-btn") {
    console.log(1);
  } else if (e.target.classList == "edit-btn") {
    console.log(2);
  } else if (e.target.classList == "check-box") {
    console.log(3);
  }
});

// DB에 데이터 추가하는 함수
const addTodo = () => {
  fetch(url, {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo: "놀기", done: false }),
  });
};
