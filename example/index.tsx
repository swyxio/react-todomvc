import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Todos, useTodosLocalState } from '../.';
import '../dist/todomvc.css';

const App = () => {
  const props = useTodosLocalState()
  return (
    <div>
      <Todos {...props} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
