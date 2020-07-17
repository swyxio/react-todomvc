import React from 'react';
import cn from 'classnames';

export type TodoType = {
  value: string;
  completed?: boolean;
  id: string;
};

export type TodosProps = {
  todos: TodoType[];
  commitNewTodo: (value: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  clearCompletedTodos?: () => void;
};

let id = 0;
export function useTodosLocalState(): TodosProps {
  // native hooks
  const [todos, setTodos] = React.useState<TodoType[]>([]);
  // external API + implementation
  return {
    todos,
    async commitNewTodo(value: string) {
      setTodos([...todos, { value, id: '' + id++, completed: false }]);
    },
    async toggleTodo(id: string) {
      setTodos(
        todos.map(todo =>
          todo.id !== id ? todo : { ...todo, completed: !todo.completed }
        )
      );
    },
    clearCompletedTodos: () => {
      window.confirm('Sure you want to clear completed todos?') &&
        setTodos(todos.filter(t => !t.completed));
    },
  };
}

export function Todos({
  todos,
  commitNewTodo,
  toggleTodo,
  clearCompletedTodos,
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
    commitNewTodo(newTodo).then(() => setNewTodo(''));
  const filteredTodos = todosMap[filter] || todos;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
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