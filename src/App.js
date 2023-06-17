
import AddTodo from './AddTodo';
import './App.css';
import TodoList from './TodoList';

function App() {
  return (
    <div>
<div className='container'>
  <div className='app-wrapper'>
  <AddTodo />
      <TodoList />
  </div>
</div>
      
    </div>
  );
}

export default App;
