import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Todos, useTodosLocalStorageState } from '../.';
import '../dist/todomvc.css';

const App = () => {
  const props = useTodosLocalStorageState();
  return (
    <div>
      <Todos {...props}>
        <h2>
          A simple React component to demo your backend!{' '}
          <a href="https://github.com/sw-yx/react-todomvc">View source here.</a>
        </h2>
      </Todos>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
