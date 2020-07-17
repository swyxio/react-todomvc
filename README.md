# react-todomvc

TodoMVC with a clean React implementation (no Redux). Done in TypeScript because [I like React + TypeScript](https://react-typescript-cheatsheet.netlify.app/). Use this as an easy demo to show off your backend integrations. (e.g. React + Firebase, React + AWS Amplify, React + Node/Express/Mongo, etc.)

**Live Demo: [react-todomvc.netlify.app](https://react-todomvc.netlify.app)**

![image](https://user-images.githubusercontent.com/6764957/87823641-59816500-c8a6-11ea-920e-5140041977b0.png)


## Installation

```bash
npm i react-todomvc
```

## Usage

The core of this package is a `<Todos>` component that takes 5 props:

- `todos:  TodoType[]`: an array of `TodoType` objects 
- `commitNewTodo: (value: string) => Promise<void>`: callback for adding a new todo
- `toggleTodo: (id: string) => Promise<void>`: callback for toggling the completion state of a todo of `id`
- `clearCompletedTodos?: () => void`: callback for clearing completed todos (optional - if omitted, the corresponding button won't show)
- `todosTitle?: string`: optional string - to customize the title shown. defaults to `"React-TodoMVC"`.


For demo purposes, a sample implementation is provided from `useTodosLocalState`. The intent is that you will swap out these functions for your own as you implement your backend.


```js
import { Todos, useTodosLocalState } from 'react-todomvc';
import 'react-todomvc/dist/todomvc.css'; // for styling

const App = () => {
  const props = useTodosLocalState() // FOR DEMO CREATOR: replace this with your impl!
  return (
    <div>
      <Todos {...props} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

If you want something that persists in localstorage, you can use `useTodosLocalStorageState` instead. It has the same API as `useTodosLocalState`


## Acknowledgements

The http://todomvc.com/ project

the `todomvc.css` was combined from `todomvc-app-css` and `todomvc-common`.