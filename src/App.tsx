import {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList"

export type FilterValuesType = "all" | "complited" | "active"

function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: "CSS", isDone: false},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
  ])
  
  const [filter, setFilter] = useState<FilterValuesType>("all")

  function removeTask(id: number){
    setTasks(tasks.filter(task => task.id !== id))
  }

  function cahangeFilter(value: FilterValuesType){
    setFilter(value)
  }

  let tasksForTodoList = tasks

  if (filter === "complited"){
    tasksForTodoList = tasks.filter(task => task.isDone === true)
  }

  if (filter === "active"){
    tasksForTodoList = tasks.filter(task => task.isDone === false)
  }
 
  return (
    <div className="App">
      <TodoList 
          title="What to learn" 
          tasks={tasksForTodoList} 
          removeTask={removeTask}
          cahangeFilter={cahangeFilter}
        />
    </div>
  );
}


export default App;
