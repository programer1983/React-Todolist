import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList"

function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: "CSS", isDone: false},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
  ])

  function removeTask(id: number){
    setTasks(tasks.filter(task => task.id !== id))
  }
 
  return (
    <div className="App">
      <TodoList title="What to learn" tasks={tasks} removeTask={removeTask}/>
    </div>
  );
}


export default App;
