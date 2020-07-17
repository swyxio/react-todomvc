import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Todos, useTodosLocalState } from '../.';
import '../dist/todomvc.css';

const App = () => {
  const props = useTodosLocalState()
  return (
    <div>
      <h1>React-TodoMVC demo - a demo React component to demo your backend!</h1>
      <h2><a href="https://github.com/sw-yx/react-todomvc">View source here.</a></h2>
      <Todos {...props} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
