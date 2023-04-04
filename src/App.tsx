import {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList"
import {v1} from "uuid"

export type FilterValuesType = "all" | "complited" | "active"

function App() {
  const [tasks, setTasks] = useState([
    {id: v1(), title: "CSS", isDone: false},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
  ])
  
  const [filter, setFilter] = useState<FilterValuesType>("all")

  function addTask(title: string){
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    }
    setTasks([...tasks, newTask])
  }

  function removeTask(id: string){
    setTasks(tasks.filter(task => task.id !== id))
  }

  function cahangeFilter(value: FilterValuesType){
    setFilter(value)
  }

  function changeStatus(taskId: string, isDone: boolean){
    let task = tasks.find(t => t.id === taskId)
    if (task){
      task.isDone = isDone
    }
    setTasks([...tasks])
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
          filter={filter}
          addTask={addTask}
          changeTaskStatus={changeStatus}
        />
    </div>
  );
}


export default App;
