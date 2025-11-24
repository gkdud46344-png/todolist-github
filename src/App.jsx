import { useState, useEffect } from 'react'
import TodoList from './compoments/TodoList';
import TodoInput from './compoments/TodoInput';
import './App.css'


function App() {
  const [todos, setTodos] = useState(() => {

    // localStorage에 'todos'라는 이름으로 저장된게 있는지 확인
    const saved = localStorage.getItem("todos")

    if (saved) {
      // JSON 문자열을 다시 객체 또는 배열로 변환해서 반환
      return JSON.parse(saved)
    }

    // 없으면 빈 배열 반환
    return []
  });


  // todos 상태가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    // 원래 배열/객체를 문자열로 바꿔서 저장
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  function addTodo(newTodo) {
    setTodos([...todos, {
      // UUID 겹치지 않는 고유한 ID를 만들 때 사용
      id: crypto.randomUUID(),
      text: newTodo,
      done: false,
      isEditing: false
    }
    ]);
    //새 항목 추가시 완료상태는 false(미완료) 
  }

  // 수정모드 전환 함수
  function toggleEdit(id) {
    const editTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isEditing: !item.isEditing }
      }
      return item;
    });
    setTodos(editTodos);
  }

  // 수정완료함수 (저장 버튼 클릭 시)
  function updateTodo(id, newText) {
    const updateTodos = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          text: newText,
          isEditing: false
          //텍스트 변경 + edit 상태를 false로 변경
        }
      }
      return item;
    })
    setTodos(updateTodos)
  }

  // 할일 완료 상태 (체크박스)
  function toggleTodo(id) {
    const newTodos = todos.map((item) => {
      if (item.id === id) { //해당 id가 내가 클릭한 id면
        return { ...item, done: !item.done } //원래 내용은 그대로 두고 done 속성만 반대로 바꿈
      }
      return item;
    });

    setTodos(newTodos) // 새배열로 상태 업데이트
  }

  // filter 함수로 변경
  // filter: 배열을 하나씩 훑으면서 조건에 맞는 것만 새 배열로 반환
  function deleteTodo(deleteIndex) {
    // const newTodos = todos.filter((item, index) => index !== deleteIndex);

    // index -> id로 변경하면
    setTodos(todos.filter((item) => item.id !== id));
  }
  return (
    <>
      <div className='app'>
        <h1 className='title'>Todo List(할일)</h1>

        <div className='contents'>
          <TodoInput onAdd={addTodo} />

          <TodoList todos={todos} Delete={deleteTodo} onToggle={toggleTodo} onEdit={toggleEdit}
            onUpdate={updateTodo} />

        </div>
      </div>
    </>
  )
}

export default App

//로컬스토리지란
// 웹 브라우저에 데이터를 저장하는 공간
// 브라우저를 닫아도 데이터를 유지
// 용량 제한

