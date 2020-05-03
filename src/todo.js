//   input = form.querySelector("input"); 이렇게 네이밍하면 greeting.js에 있는 input과 충돌 -> 이유는 const라서
const todoForm = document.querySelector(".js-todoForm"),
  todoInput = todoForm.querySelector("input"),
  todoList = document.querySelector(".js-todoList");

const TODOS_LS = "todos";
let todos = []; // 배열안애 값이 변한다.

// localStorage 에 저장하기
const saveTodos = () => {
  localStorage.setItem(TODOS_LS, JSON.stringify(todos)); // 오직 string만 들어갈 수 있다.
};

/* 
  todo 지우기 3단게
  1. html 코드에서 지우기 -> 어떤 버튼이 클릭 되었는 가 알아야 함 (ref. delete child element MDN)
  2. localStorage에서 지우기 -> 새로고침해도 없어져 있어야 함
  3. 지운 상태의 데이터 저장하기
*/
const deleteTodo = (evnet) => {
  // console.dir(evnet.target); 부모 태그 찾기
  // console.log(evnet.target.parentNode);
  const btn = evnet.target;
  const li = btn.parentNode; // 선택된 li
  todoList.removeChild(li);

  const cleanTodos = todos.filter(
    (todo) =>
      // console.log(todo.id, li.id); -> int, string
      todo.id !== parseInt(li.id) // 한 줄 짜리는 return 필요 없음
  );
  todos = cleanTodos;
  saveTodos();
};

const paintTodos = (text) => {
  // console.log(text);
  // 뭔가를 생성하기를 원한다면
  // 먼저 이렇게 비어있는(empty) 태그를 만든다.
  const li = document.createElement("li");
  const delBtn = document.createElement("button");

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteTodo);
  const span = document.createElement("span");
  span.innerText = text;

  const newId = todos.length + 1; // 처음 array의 값은 비어 있어서 시작부터 1을 넣는다.

  // li에도 id 값을 넣는다. 이유는 나중에 값을 지울 떄 어떤 것을 지울 지 알아야 하기 때문에
  li.id = newId;

  // 뭔가를 부모 요소에 넣는다.
  li.appendChild(delBtn); //btn을 li에 넣는다.
  li.appendChild(span); // span을 li에 넣는다.
  todoList.appendChild(li);

  // 할 일을 입력하면 array에 등록
  const todoObj = {
    text: text,
    id: newId,
  };
  todos.push(todoObj);
  saveTodos(); // 투두 작성하고 sav함수 부른다.
};

const handleSubmitTodos = (e) => {
  e.preventDefault();
  const currentValue = todoInput.value; // submit 의 value
  paintTodos(currentValue);
  todoInput.value = ""; // 엔터를 눌렸을 때 생성 되고, 다시 input value를 초기화
};

const loadTodos = () => {
  const loadedTodos = localStorage.getItem(TODOS_LS);
  if (loadedTodos !== null) {
    const parseTodos = JSON.parse(loadedTodos);
    parseTodos.forEach((todo) => {
      // console.log(todo.text);
      paintTodos(todo.text);
    });
  } else {
    console.log("할 일을 입력하세요~");
  }
};

const Todo = () => {
  loadTodos();
  todoForm.addEventListener("submit", handleSubmitTodos);
};
Todo();
