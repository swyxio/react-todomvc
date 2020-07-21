import React from 'react';
import cn from 'classnames';

export type TodoType = {
  value: string;
  completed?: boolean;
  id: string;
};

export type TodosProps = {
  todos: TodoType[];
  addNewTodo: (value: string) => Promise<void>;
  updateTodo: (modifiedTodo: TodoType) => Promise<void>;
  deleteTodo?: (id: string) => Promise<void>;
  clearCompletedTodos?: () => void;
  todosTitle?: string;
  children?: React.ReactNode;
};

// https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
function uuid() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
const defaultTodos: TodoType[] = [
  {
    id: '0',
    completed: true,
    value: 'Learn React',
  },
  {
    id: '1',
    completed: false,
    value: 'Learn AWS',
  },
  {
    id: '2',
    completed: false,
    value: 'Profit',
  },
];
export function useTodosLocalState() {
  // native hooks
  const [todos, setTodos] = React.useState<TodoType[]>(defaultTodos);
  // external API + implementation
  return {
    todos,
    async addNewTodo(value: string) {
      setTodos([...todos, { value, id: uuid(), completed: false }]);
    },
    async updateTodo(modifiedTodo: TodoType) {
      setTodos(
        todos.map(todo =>
          todo.id !== modifiedTodo.id
            ? todo
            : { ...todo, completed: !todo.completed }
        )
      );
    },
    clearCompletedTodos: () => {
      window.confirm('Sure you want to clear completed todos?') &&
        setTodos(todos.filter(t => !t.completed));
    },
  };
}

export function useTodosLocalStorageState() {
  let _pastState = localStorage.getItem('TODO');
  let pastState = _pastState
    ? JSON.parse(_pastState) || defaultTodos
    : defaultTodos;
  const [todos, setTodos] = React.useState<TodoType[]>(pastState);
  React.useEffect(() => {
    localStorage.setItem('TODO', JSON.stringify(todos));
  });
  // external API + implementation
  return {
    todos,
    async addNewTodo(value: string) {
      setTodos([...todos, { value, id: uuid(), completed: false }]);
    },
    async updateTodo(modifiedTodo: TodoType) {
      setTodos(
        todos.map(todo =>
          todo.id !== modifiedTodo.id
            ? todo
            : { ...todo, completed: !todo.completed }
        )
      );
    },
    async deleteTodo(id: string) {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    clearCompletedTodos: () => {
      window.confirm('Sure you want to clear completed todos?') &&
        setTodos(todos.filter(t => !t.completed));
    },
  };
}

export function Todos({
  todos,
  addNewTodo,
  updateTodo,
  clearCompletedTodos,
  deleteTodo,
  todosTitle = 'React-TodoMVC',
  children,
}: TodosProps) {
  const [filter, setFilter] = React.useState('all');
  const todosMap = {
    active: todos.filter(t => !t.completed),
    completed: todos.filter(t => t.completed),
  } as Record<string, TodoType[]>;

  // newtodo
  const [newTodo, setNewTodo] = React.useState('');
  const onNewTodo_enter = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === 'Enter' &&
    newTodo.length > 0 &&
    addNewTodo(newTodo).then(() => setNewTodo(''));
  const filteredTodos = todosMap[filter] || todos;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>{todosTitle}</h1>
        {children}
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onKeyPress={onNewTodo_enter}
          onChange={e => setNewTodo(e.target.value)}
          value={newTodo}
        />
      </header>
      <section className="main">
        <input id="toggle-all" className="toggle-all" type="checkbox" />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li key={todo.id} className={cn(todo.completed && 'completed')}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    updateTodo({ ...todo, completed: !todo.completed })
                  }
                />
                <label>{todo.value}</label>
                {deleteTodo && (
                  <button
                    className="destroy"
                    onClick={() => deleteTodo(todo.id)}
                  ></button>
                )}
              </div>
              <input className="edit" defaultValue={todo.value} />
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          <strong>
            {todosMap.active.length}/{todos.length}
          </strong>{' '}
          item{todosMap.active.length > 1 && 's'} left
        </span>
        <ul className="filters">
          <li>
            <a
              className={cn(filter === 'all' && 'selected')}
              onClick={() => setFilter('all')}
            >
              All
            </a>
          </li>
          <li>
            <a
              className={cn(filter === 'active' && 'selected')}
              onClick={() => setFilter('active')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              className={cn(filter === 'completed' && 'selected')}
              onClick={() => setFilter('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        {clearCompletedTodos && (
          <button
            className="clear-completed"
            onClick={() => {
              clearCompletedTodos();
              setFilter('all');
            }}
          >
            Clear completed
          </button>
        )}
      </footer>
    </section>
  );
}
