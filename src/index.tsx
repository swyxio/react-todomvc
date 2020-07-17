import React from "react";
import cn from "classnames";
import "./todomvc.css";
// import { Todo } from "./Todo";

type TodoType = {
  value: string;
  completed?: boolean;
  id: string;
};

let id = 0;

export function Todos() {
  const [hash, setHash] = React.useState("all");
  const [todos, setTodos] = React.useState<TodoType[]>([]);
  const todosMap = {
    active: todos.filter((t) => !t.completed),
    completed: todos.filter((t) => t.completed),
  } as Record<string, TodoType[]>;

  // newtodo
  const commitNewTodo = (value: string) => {
    setTodos([...todos, { value, id: "" + id++, completed: false }]);
    setNewTodo("");
  };
  const [newTodo, setNewTodo] = React.useState("");
  const onNewTodo_change = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTodo(e.target.value);
  const onNewTodo_enter = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && newTodo.length > 0 && commitNewTodo(newTodo);

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id !== id ? todo : { ...todo, completed: !todo.completed }
      )
    );
  };
  const clearCompleted = () =>
    window.confirm("sure you want to clear completed?") &&
    setTodos(todosMap.active) &&
    setHash("all");

  // const numActiveTodos = todos.filter((todo) => !todo.completed).length;
  // const allCompleted = todos.length > 0 && numActiveTodos === 0;
  // const mark = !allCompleted ? "completed" : "active";
  const filteredTodos = todosMap[hash] || todos;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onKeyPress={onNewTodo_enter}
          onChange={onNewTodo_change}
          value={newTodo}
        />
      </header>
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li key={todo.id} className={cn(todo.completed && "completed")}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <label>{todo.value}</label>
                <button className="destroy"></button>
              </div>
              <input className="edit" defaultValue={todo.value} />
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>{todosMap.active.length}</strong> item left
        </span>
        <ul className="filters">
          <li>
            <button
              className={cn(hash === "all" && "selected")}
              onClick={() => setHash("all")}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={cn(hash === "active" && "selected")}
              onClick={() => setHash("selected")}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={cn(hash === "completed" && "selected")}
              onClick={() => setHash("completed")}
            >
              Completed
            </button>
          </li>
        </ul>
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    </section>
  );
}
