import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import { updateTodo, deleteTodo, toggleTodo, submitTodo } from './TodoReducer';
import Modal from 'react-bootstrap/Modal';
function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState({ index: -1, isEditing: false });
  const [editText, setEditText] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {    
    const initialCheckedItems = todos.map((todo) => todo.completed);
    setCheckedItems(initialCheckedItems);
  }, [todos]);
  const handleClick = (event, index) => {
    if (activeIndex.index === index && activeIndex.isEditing) {
     return;
    }
    if (event.target.classList.contains('todo-text')) {
      if (activeIndex.index === index) {
               setActiveIndex({ index, isEditing: !activeIndex.isEditing });
      } else {
       
        setActiveIndex({ index, isEditing: true });
        setEditText(todos[index].text);
      }
    }
  };

  const handleInputChange = (event) => {
    setEditText(event.target.value);
  };

  const handleUpdate = (event) => {
    event.stopPropagation();
    dispatch(
      updateTodo({
        index: activeIndex.index,
        text: editText,
      })
    );

    setActiveIndex({ index: -1, isEditing: false });
    setEditText('');
  };

  const handleDelete = (event, index) => {
    event.stopPropagation();
    const isDeletingActive = activeIndex.index === index;

    dispatch(deleteTodo({ index }));

    if (isDeletingActive) {
      setActiveIndex({ index: -1, isEditing: false });
      setEditText('');
    } else if (activeIndex.index > index) {
      setActiveIndex({ index: activeIndex.index - 1, isEditing: activeIndex.isEditing });
    }
  };

  const handleCheckboxChange = (event, index) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = event.target.checked;
    setCheckedItems(updatedCheckedItems);
    dispatch(toggleTodo({ index }));
  };

  const handleSubmit = async () => {
    try {
      const newTodos = todos.map((todo, index) => ({
        
        title: todo.text,
        completed: todo.completed,
      }));
  
      if (newTodos.length > 0) {
        await dispatch(submitTodo(newTodos));
  
        setEditText('');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error submitting todos:', error);
    }
  };
    return (
    <>
      <ListGroup variant="flush" className="custom-list">
        {todos.map((todo, index) => (
          <ListGroup.Item key={todo.id}>
            <div
              className={`todo-item d-flex justify-content-between align-items-center ${
                activeIndex.index === index ? 'active' : ''
              }`}
              onClick={(event) => handleClick(event, index)}
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={checkedItems[index] || false}
                  onChange={(event) => handleCheckboxChange(event, index)}
                />
                <label className="form-check-label" htmlFor={`checkbox-${index}`}>
                  {activeIndex.index === index && activeIndex.isEditing ? (
                    <input type="text" value={editText} onChange={handleInputChange} autoFocus />
                  ) : (
                    <div className="todo-text">{todo.text}</div>
                  )}
                </label>
              </div>
              <div className="d-flex">
                {activeIndex.index === index && (
                  <div className="active-buttons">
                    <Button variant="primary" className="me-2" onClick={handleUpdate}>
                      Update
                    </Button>
                  </div>
                )}
                <div>
                  <Button variant="danger" onClick={(event) => handleDelete(event, index)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="submit-button">
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Your todos are successfully posted</Modal.Title>
  </Modal.Header>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
    </>
  );
}
export default TodoList;
