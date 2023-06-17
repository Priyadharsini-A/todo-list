import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);      
    },
    updateTodo: (state, action) => {
      const { index, text } = action.payload;
      state[index] = { ...state[index], text: text };
    },
    deleteTodo: (state, action) => {
      const { index } = action.payload;
      state.splice(index, 1);
    },
    toggleTodo: (state, action) => {
      const { index } = action.payload;
      console.log("toggle",action.payload)
      const todo = state[index];
      todo.completed = !todo.completed;
      console.log(todo.completed)
    },    
    submitTodo: {
      reducer: (state, action) => {
        const todos = action.payload ? Object.values(action.payload) : [];
        todos.forEach((todo) => {
          state.push({ ...todo, completed: false });
        });
      },
      prepare: async (todos) => {
        try {
          const response = await axios.post(
            'https://jsonplaceholder.typicode.com/todos',
            todos
          );
          console.log('Todos successfully posted:', response.data);
          return todos; 
        } catch (error) {
          console.error('Error posting todos:', error);
          throw error;
        }
      },
    },
      
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleTodo, submitTodo } = todoSlice.actions;
export default todoSlice.reducer;
