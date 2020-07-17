# react-todomvc

TodoMVC with a clean React implementation (no Redux). Use this as an easy demo to show off your backend integrations. (e.g. React + Firebase, React + AWS Amplify, React + Node/Express/Mongo, etc.)

**Live Demo: [react-todomvc.netlify.app](https://react-todomvc.netlify.app)**

## Installation

```bash
npm i react-todomvc
```

## Usage

The core of this package is a `<Todos>` component that takes 4 props:

- `todos:  TodoType[]`: an array of `TodoType` objects 
- `commitNewTodo: (value: string) => Promise<void>`: callback for adding a new todo
- `toggleTodo: (id: string) => Promise<void>`: callback for toggling the completion state of a todo of `id`
- `clearCompletedTodos?: () => void`: callback for clearing completed todos (optional - if omitted, the corresponding button won't show)


For demo purposes, a sample implementation is provided from `useTodosLocalState`. The intent is that you will swap out these functions for your own as you implement your backend.


```js
import { Todos, useTodosLocalState } from 'react-todomvc';
import '../dist/todomvc.css'; // for styling

const App = () => {
  const props = useTodosLocalState() // TODO: replace this
  return (
    <div>
      <Todos {...props} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## Acknowledgements

The http://todomvc.com/ project

the `todomvc.css` was combined from `todomvc-app-css` and `todomvc-common`.