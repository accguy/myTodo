const $ul = document.querySelector("ul");
const $input = document.querySelector("input");
const $submitBtn = document.querySelector(".submit-btn");

// 서버에 있는 데이터 요청하기
// 받아온 데이터 화면에 렌더링하기

const renderItems = (item) => {
  const $li = document.createElement("li");
  const $deleteBtn = document.createElement("button");
  const $editBtn = document.createElement("button");
  const $checkbox = document.createElement("input");

  $li.innerText = item.todo;
  $deleteBtn.innerText = "삭제";
  $editBtn.innerText = "수정";
  $checkbox.type = "checkbox";

  $li.append($checkbox, $editBtn, $deleteBtn);
  $ul.appendChild($li);
};

const getDataAndRender = async () => {
  const res = await fetch("http://localhost:3000/todoList");
  const todoList = await res.json();
  console.log(todoList);
  todoList.forEach(renderItems);
};
getDataAndRender();

// 인풋에 값을 입력하고 제출 버튼을 누르면
// 리스트에 새로운 항목 생성됨
// DB에 새로운 아이템 저장됨

// 이벤트 리스너는 이벤트 위임으로 하자
//
